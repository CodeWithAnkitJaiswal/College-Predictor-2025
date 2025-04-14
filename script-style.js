function showMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const mobileUl = document.getElementById('mobile-ul');
    const nav = document.getElementById('nav');
    menuIcon.classList.toggle('active');
    mobileUl.classList.toggle('active');
    nav.classList.toggle('active');
}

document.getElementById('print-btn').addEventListener('click', () => {
    window.print();
});



const mobileLinks = document.querySelectorAll('.mobile-ul a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('menuIcon').classList.remove('active');
        document.getElementById('mobile-ul').classList.remove('active');
        document.getElementById('nav').classList.remove('active');
        document.body.style.overflow = '';
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("branchModal");
    const openBtn = document.getElementById("openBranchModal");
    const closeBtn = document.getElementById("closeModal");
    const searchInput = document.getElementById("dropdown-search");
    const selectAllBtn = document.getElementById("select-all");
    const deselectAllBtn = document.getElementById("deselect-all");
    const dropdownOptions = document.getElementById("dropdown-options");
    const dropdownToggle = document.getElementById("openBranchModal");


    // Open modal
    openBtn.onclick = () => {
        modal.style.display = "block";
    };

    // Close modal
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Select all branches
    selectAllBtn.addEventListener("click", () => {
        const checkboxes = dropdownOptions.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((cb) => (cb.checked = true));
        updateToggleText();
    });

    // Deselect all branches
    deselectAllBtn.addEventListener("click", () => {
        const checkboxes = dropdownOptions.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((cb) => (cb.checked = false));
        updateToggleText();
    });

    // Search filter
    searchInput.addEventListener("input", function() {
        const filter = this.value.toLowerCase();
        const items = dropdownOptions.querySelectorAll("li");

        items.forEach((item) => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(filter) ? "" : "none";
        });
    });

    // Update toggle button label based on selection
    function updateToggleText() {
        const selected = dropdownOptions.querySelectorAll('input[type="checkbox"]:checked');
        if (selected.length === 0) {
            dropdownToggle.textContent = "Select Branches";
        } else if (selected.length === 1) {
            dropdownToggle.textContent = selected[0].parentNode.textContent.trim();
        } else {
            dropdownToggle.textContent = `${selected.length} branches selected`;
        }
    }

    // Observe checkbox changes
    const observer = new MutationObserver(() => {
        const checkboxes = dropdownOptions.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.addEventListener('change', updateToggleText));
    });

    observer.observe(dropdownOptions, { childList: true });

    updateToggleText(); // Initial state
});