(async() => {
    const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` });
    const response = await fetch('uptu.db');
    const buffer = await response.arrayBuffer();
    const db = new SQL.Database(new Uint8Array(buffer));

    window.db = db;
    const form = document.getElementById('form');
    const loadMoreBtn = document.getElementById('loadMore');
    const batchSize = 50;
    let resultData = [];
    let displayedCount = 0;

    loadMoreBtn.style.display = 'none';

    populateRound();
    populateBranches();
    populateCategory();
    populateBranchCategories();

    form.addEventListener('submit', e => {
        e.preventDefault();
        runPredictor();
    });

    loadMoreBtn.addEventListener('click', () => {
        displayResults();
    });

    function updateToggleText() {
        const checkedCount = document.querySelectorAll('input[name="branches"]:checked').length;
        const totalCount = document.querySelectorAll('input[name="branches"]').length;
        const toggleText = document.getElementById('branchToggleText');
        if (toggleText) {
            toggleText.innerText = checkedCount === totalCount ? 'Unselect All' : 'Select All';
        }
    }


    function populateRound() {
        const res = db.exec(`SELECT DISTINCT Rounds FROM tb ORDER BY Rounds ASC`);
        if (!res.length) return;
        const roundSelect = document.getElementById('round');
        roundSelect.innerHTML = ``;
        res[0].values.forEach(([Round]) => {
            const opt = document.createElement('option');
            opt.value = Round;
            opt.textContent = Round;
            roundSelect.appendChild(opt);
        });
    }

    function populateCategory() {

        const res = db.exec(`SELECT DISTINCT Seat FROM tb ORDER BY Seat ASC`);
        if (!res.length) return;
        const categorySelect = document.getElementById('category');
        categorySelect.innerHTML = `<option value="Select Category" selected>Select Category</option>`;
        res[0].values.forEach(([seat]) => {
            const opt = document.createElement('option');
            opt.value = seat;
            opt.textContent = seat;
            categorySelect.appendChild(opt);
        });
    }

    function populateBranches() {
        const res = db.exec(`SELECT DISTINCT Branch FROM tb ORDER BY Branch ASC`);
        if (!res.length) return;
        const branchList = document.getElementById('dropdown-options');
        branchList.innerHTML = '';
        res[0].values.forEach(([branch]) => {
            const li = document.createElement('li');
            li.innerHTML = `
        <label>
          <input type="checkbox" name="branches" value="${branch}">
          ${branch}
        </label>`;
            branchList.appendChild(li);
        });
    }

    function populateBranchCategories() {
        const categories = [
            { label: "Computer Science Related", keyword: "Computer Science,Computing,Software,Informatics,computer" },
            { label: "Artificial Intelligence Related", keyword: "Artificial Intelligence,AI" },
            { label: "Data Science Related", keyword: "Data Science,Analytics,data,ds,d.s." },
            { label: "Electronics Related", keyword: "Electronics,Communication,VLSI" },
            { label: "Mechanical Related", keyword: "Mechanical" },
            { label: "Civil Related", keyword: "Civil" },
            { label: "Chemical Related", keyword: "Chemical" },
            { label: "Design and Architecture", keyword: "Architecture,Design,Planning" }
        ];

        const branchTypeUl = document.getElementById('branchType');
        branchTypeUl.innerHTML = '';

        categories.forEach(({ label, keyword }) => {
            const li = document.createElement('li');
            li.innerHTML = `
              <label>
                <input type="checkbox" class="branch-category" data-keyword="${keyword}">
                ${label}
              </label>`;
            branchTypeUl.appendChild(li);
        });

        function updateCategoryCheckboxes() {
            document.querySelectorAll('.branch-category').forEach(categoryCheckbox => {
                const keywords = categoryCheckbox.getAttribute('data-keyword').split(',').map(k => k.trim().toLowerCase());
                const allMatchingBranches = Array.from(document.querySelectorAll('input[name="branches"]')).filter(input =>
                    keywords.some(keyword => input.value.toLowerCase().includes(keyword))
                );
                const allChecked = allMatchingBranches.length > 0 && allMatchingBranches.every(cb => cb.checked);
                categoryCheckbox.checked = allChecked;
            });
        }

        function syncCategoryCheckboxes() {
            updateCategoryCheckboxes();
            updateToggleText();
        }

        document.querySelectorAll('input[name="branches"]').forEach(input => {
            input.addEventListener('change', syncCategoryCheckboxes);
        });

        document.querySelectorAll('.branch-category').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const keywords = this.getAttribute('data-keyword').split(',').map(k => k.trim().toLowerCase());
                const check = this.checked;
                document.querySelectorAll('input[name="branches"]').forEach(input => {
                    if (keywords.some(keyword => input.value.toLowerCase().includes(keyword))) {
                        input.checked = check;
                        input.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
            });
        });

        // Sync category checkboxes on Select All / Deselect All
        const selectAllBtn = document.getElementById("select-all");
        const deselectAllBtn = document.getElementById("deselect-all");
        if (selectAllBtn && deselectAllBtn) {
            selectAllBtn.addEventListener("click", () => {
                document.querySelectorAll('input[name="branches"]').forEach(cb => {
                    cb.checked = true;
                    cb.dispatchEvent(new Event('change', { bubbles: true }));
                });
                updateCategoryCheckboxes();
                updateToggleText();
            });

            deselectAllBtn.addEventListener("click", () => {
                document.querySelectorAll('input[name="branches"]').forEach(cb => {
                    cb.checked = false;
                    cb.dispatchEvent(new Event('change', { bubbles: true }));
                });
                updateCategoryCheckboxes();
                updateToggleText();
            });
        }

        // Also sync on initial load in case defaults are checked
        syncCategoryCheckboxes();
    }


    function runPredictor() {
        const rankInput = document.getElementById('rank').value.trim();
        const category = document.getElementById('category').value;
        const state = document.getElementById('home-state').value;
        const round = document.getElementById('round').value;
        const genderEl = document.querySelector('input[name="gender"]:checked');
        const gender = genderEl ? genderEl.value : null;

        if (!/^[0-9]+$/.test(rankInput)) {
            Swal.fire("Invalid Rank", "Please enter a valid numeric rank.", "warning");
            return;
        }
        if (!gender) {
            Swal.fire("Select Gender", "Please select your gender.", "warning");
            return;
        }

        const rank = parseInt(rankInput);
        const selectedBranches = Array.from(document.querySelectorAll('input[name="branches"]:checked')).map(el => `'${el.value}'`);
        if (!selectedBranches.length) {
            Swal.fire("No Branch Selected", "Please select at least one branch.", "warning");
            return;
        }


        const branchFilter = selectedBranches.join(', ');

        let query = `
      SELECT Institute, State, Branch, Quota, Seat, Gender, Open, Close FROM tb
      WHERE Seat = '${category}'
        AND Branch IN (${branchFilter})
        AND Gender = '${gender}'
        AND Rounds = '${round}'
        AND Close >= ${rank}`;

        if (state !== 'Select HomeState') {
            query += `
        AND (
          (Quota IN ('HS') AND State = '${state}')
          OR (Quota = 'OS' AND State != '${state}')
          OR Quota = 'AI')`;
        }

        query += ` ORDER BY Close ASC`;

        try {
            const res = db.exec(query);
            if (!res.length || !res[0].values.length) {
                Swal.fire({
                    icon: "error",
                    title: "Nothing Found",
                    text: "No colleges available for your input. Try adjusting your rank or branch preferences. NOTE: IF YOU ARE NOT FROM UP CHOOSE CATOGERY OPEN OTHERWISE NO COLLEGE SHOWN"
                });
                loadMoreBtn.style.display = 'none';
                return;
            }
            resultData = res[0].values;
            displayedCount = 0;
            loadMoreBtn.style.display = resultData.length > batchSize ? 'block' : 'none';
            displayResults();
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Something went wrong with the query.", "error");
        }
    }

    function displayResults() {
        const tableContainer = document.getElementById('table-container');
        let html = '';

        if (displayedCount === 0) {
            html = `
        <div class="result-table">
        <table border="0">
          <thead>
            <tr>
              <th>Institute</th>
              <th>Branch</th>
              <th>Quota</th>
              <th>Seat</th>
              <th>Gender</th>
              <th>Open Rank</th>
              <th>Close Rank</th>
            </tr>
          </thead>
          <tbody id="resultBody">
          </tbody>
        </table>
        </div>`;
            tableContainer.innerHTML = html;
        }

        const resultBody = document.getElementById('resultBody');
        const nextBatch = resultData.slice(displayedCount, displayedCount + batchSize);

        nextBatch.forEach(row => {
            const [institute, state, branch, quota, seat, gender, open, close] = row;
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td><a href="https://www.google.com/search?q=${encodeURIComponent(institute)}" target="_blank">${institute}</a></td>

        <td>${branch}</td>
        <td>${quota}</td>
        <td>${seat}</td>
        <td>${gender}</td>
        <td>${open}</td>
        <td>${close}</td>`;
            resultBody.appendChild(tr);
        });

        displayedCount += nextBatch.length;
        if (displayedCount >= resultData.length) {
            loadMoreBtn.style.display = 'none';
        }
    }
})();
