// Shared utility functions
function logMessage(message) {
    console.log(`Advisee List Enhancer: ${message}`);
}

// Version 1 functions
function getLastNameV1(nameText) {
    logMessage(`Original name text (V1): ${nameText}`);
    
    const nameParts = nameText.split('View Profile')[0].trim().split(' ');
    logMessage(`Name parts after splitting (V1): ${nameParts}`);

    const lastName = nameParts[nameParts.length - 1];
    const firstName = nameParts[0];
    logMessage(`Extracted (V1): First Name: "${firstName}", Last Name: "${lastName}"`);

    return { lastName, firstName };
}

function sortAdviseesByLastNameV1() {
    logMessage("Sorting advisees (V1)...");
    const table = document.querySelector('#advisee-listing-grid table');
    if (!table) {
        logMessage("Advisee table not found (V1)");
        return;
    }

    const tbody = table.querySelector('tbody');
    if (!tbody) {
        logMessage("Table body not found (V1)");
        return;
    }

    const rows = Array.from(tbody.querySelectorAll('tr'));
    if (rows.length === 0) {
        logMessage("No advisee rows found (V1)");
        return;
    }

    logMessage(`Total rows to sort (V1): ${rows.length}`);

    rows.sort((a, b) => {
        const cellA = a.querySelector('td[data-property="nameid"]');
        const cellB = b.querySelector('td[data-property="nameid"]');

        if (!cellA || !cellB) {
            logMessage(`Name cell not found in row (V1)`, a, b);
            return 0;
        }

        const nameTextA = cellA.textContent.trim();
        const nameTextB = cellB.textContent.trim();

        const { lastName: lastNameA, firstName: firstNameA } = getLastNameV1(nameTextA);
        const { lastName: lastNameB, firstName: firstNameB } = getLastNameV1(nameTextB);

        logMessage(`Comparing (V1): "${lastNameA}, ${firstNameA}" vs "${lastNameB}, ${firstNameB}"`);

        const lastNameComparison = lastNameA.localeCompare(lastNameB);
        if (lastNameComparison !== 0) {
            return lastNameComparison;
        } else {
            return firstNameA.localeCompare(firstNameB);
        }
    });

    logMessage("Sorting completed (V1). First few sorted names:");
    rows.slice(0, 5).forEach(row => {
        const nameCell = row.querySelector('td[data-property="nameid"]');
        logMessage(nameCell ? nameCell.textContent.trim() : "Name not found");
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    logMessage("Sorted rows reinserted into table (V1)");
}

function addSortButtonV1() {
    const existingButton = document.getElementById('sortByLastNameButton');
    if (existingButton) {
        logMessage("Sort button already exists (V1)");
        return;
    }

    const buttonContainer = document.querySelector('.advisee-list-title-buttons');
    if (!buttonContainer) {
        logMessage("Button container not found (V1)");
        return;
    }

    const sortButton = document.createElement('button');
    sortButton.id = 'sortByLastNameButton';
    sortButton.textContent = 'Sort by Last Name';
    sortButton.className = 'title-button';
    sortButton.addEventListener('click', sortAdviseesByLastNameV1);

    buttonContainer.appendChild(sortButton);
    logMessage("Sort button added (V1)");
}



// Version 2 functions
function getLastNameV2(nameText) {
    logMessage(`Original name text (V2): ${nameText}`);
    
    const cleanedText = nameText.replace(/Press enter key to view profile for student Press Escape key to select the entire row|CONFIDENTIAL|DECEASED|Press enter to activate link to view student profile/g, '').trim();
    
    const nameParts = cleanedText.split(' ');
    logMessage(`Name parts after cleaning and splitting (V2): ${nameParts}`);

    if (nameParts.length < 2) {
        logMessage(`Unable to extract first and last name from: ${cleanedText}`);
        return { lastName: cleanedText, firstName: '' };
    }

    const lastName = nameParts[nameParts.length - 1];
    const firstName = nameParts[0];
    logMessage(`Extracted (V2): First Name: "${firstName}", Last Name: "${lastName}"`);

    return { lastName, firstName };
}

function sortAdviseesByLastNameV2() {
    logMessage("Sorting advisees (V2)...");
    const table = document.querySelector('#classListTable') || document.querySelector('#advisee-listing-grid');
    if (!table) {
        logMessage("Advisee table not found (V2)");
        return;
    }

    const rows = Array.from(table.querySelectorAll('tr[role="row"]'));
    if (rows.length === 0) {
        logMessage("No advisee rows found (V2)");
        return;
    }

    logMessage(`Total rows to sort (V2): ${rows.length}`);

    rows.sort((a, b) => {
        const cellA = a.querySelector('td[data-name="studentName"]') || a.querySelector('td[xe-field="studentName"]');
        const cellB = b.querySelector('td[data-name="studentName"]') || b.querySelector('td[xe-field="studentName"]');

        if (!cellA || !cellB) {
            logMessage(`Name cell not found in row (V2)`, a, b);
            return 0;
        }

        const nameTextA = cellA.textContent.trim();
        const nameTextB = cellB.textContent.trim();

        const { lastName: lastNameA, firstName: firstNameA } = getLastNameV2(nameTextA);
        const { lastName: lastNameB, firstName: firstNameB } = getLastNameV2(nameTextB);

        logMessage(`Comparing (V2): "${lastNameA}, ${firstNameA}" vs "${lastNameB}, ${firstNameB}"`);

        const lastNameComparison = lastNameA.localeCompare(lastNameB);
        if (lastNameComparison !== 0) {
            return lastNameComparison;
        } else {
            return firstNameA.localeCompare(firstNameB);
        }
    });

    logMessage("Sorting completed (V2). First few sorted names:");
    rows.slice(0, 5).forEach(row => {
        const nameCell = row.querySelector('td[data-name="studentName"]') || row.querySelector('td[xe-field="studentName"]');
        logMessage(nameCell ? nameCell.textContent.trim() : "Name not found");
    });

    const rowContainer = table.querySelector('.tbody') || table;
    rowContainer.innerHTML = '';
    rows.forEach(row => rowContainer.appendChild(row));
    logMessage("Sorted rows reinserted into table (V2)");
}

function addSortButtonV2() {
    const existingButton = document.getElementById('sortByLastNameButton');
    if (existingButton) {
        logMessage("Sort button already exists (V2)");
        return;
    }

    const buttonContainer = document.querySelector('.caption-container') || document.querySelector('.advisee-list-title-buttons');
    if (!buttonContainer) {
        logMessage("Button container not found (V2)");
        return;
    }

    const sortButton = document.createElement('button');
    sortButton.id = 'sortByLastNameButton';
    sortButton.textContent = 'Sort by Last Name';
    sortButton.className = 'btn btn-primary title-button';
    sortButton.style.marginLeft = '10px';
    sortButton.addEventListener('click', sortAdviseesByLastNameV2);

    buttonContainer.appendChild(sortButton);
    logMessage("Sort button added (V2)");
}

function add100PerPageOption() {
    logMessage("Attempting to add 100 per page option...");
    const perPageSelect = document.querySelector('#basicGrid > div.bottom.ui-widget-header > div > div.page-size-select-wrapper > select');
    if (perPageSelect) {
        if (!Array.from(perPageSelect.options).some(option => option.value === '100')) {
            const option = document.createElement('option');
            option.value = '100';
            option.textContent = '100';
            perPageSelect.appendChild(option);
            logMessage("100 per page option added successfully");
        } else {
            logMessage("100 per page option already exists");
        }
    } else {
        logMessage("Per page select not found");
        return false;
    }
    return true;
}

function waitForElement(selector, callback, maxAttempts = 10, interval = 1000) {
    let attempts = 0;

    const tryFind = () => {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else if (++attempts < maxAttempts) {
            setTimeout(tryFind, interval);
        } else {
            logMessage(`Element ${selector} not found after ${maxAttempts} attempts`);
        }
    };

    tryFind();
}

function setupObserver() {
    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                const table = document.querySelector('#advisee-listing-grid table') || document.querySelector('#classListTable') || document.querySelector('#advisee-listing-grid');
                if (table) {
                    logMessage("Table found, applying enhancements");
                    applyEnhancements();
                    observer.disconnect();
                    break;
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function applyEnhancements() {
    logMessage("Applying enhancements...");
    if (document.querySelector('#advisee-listing-grid table')) {
        addSortButtonV1();
        if (add100PerPageOption()) {
            logMessage("100 per page option added successfully in applyEnhancements");
        } else {
            logMessage("Failed to add 100 per page option in applyEnhancements");
        }
        return true;
    } else if (document.querySelector('#classListTable') || document.querySelector('#advisee-listing-grid')) {
        addSortButtonV2();
        return true;
    }
    return false;
}

function initializeEnhancer() {
    logMessage("Initializing Advisee List Enhancer");
    
    // 立即尝试添加 100 per page 选项
    add100PerPageOption();
    
    // 等待表格元素出现
    waitForElement('#advisee-listing-grid table, #classListTable, #advisee-listing-grid', () => {
        logMessage("Table found, applying enhancements");
        if (!applyEnhancements()) {
            logMessage("Enhancements not fully applied, setting up observer");
            setupObserver();
        }
    });

    // 定期尝试添加 100 per page 选项
    let attempts = 0;
    const maxAttempts = 10;
    const intervalId = setInterval(() => {
        logMessage(`Attempt ${attempts + 1} to add 100 per page option`);
        if (add100PerPageOption() || ++attempts >= maxAttempts) {
            clearInterval(intervalId);
            logMessage(`Stopped attempting to add 100 per page option after ${attempts} attempts`);
        }
    }, 2000); // 每2秒尝试一次

    // 添加事件监听器
    document.addEventListener('change', function(e) {
        if (e.target.matches('#basicGrid > div.bottom.ui-widget-header > div > div.page-size-select-wrapper > select')) {
            logMessage("Page size changed, reapplying enhancements");
            setTimeout(() => {
                applyEnhancements();
                add100PerPageOption(); // 再次尝试添加 100 per page 选项
            }, 500);
        }
    });
}

// 初始化增强器
initializeEnhancer();

logMessage("Advisee List Enhancer setup completed");