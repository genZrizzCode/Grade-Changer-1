// ==UserScript==
// @name        Grade Changer 1
// @namespace   GitHub
// @match       https://*.powerschool.com/guardian/*
// @grant       none
// @version     1.0
// @author      genZrizzCode
// @description Changes all grades lower than an A-, to an A (91%). Only works for the overview at home.html. Grade Changer 2 will work on the detailed view.
// ==/UserScript==

// License: MIT License
// Copyright (c) 2025 genZrizzCode

(function() {
    console.log("%cGrade Changer 1 init.", "font-size: 2em; font-weight: bold; color: #39F;")
    'use strict';
    window.addEventListener('load', () => {
        let tbody = document.querySelector('table tbody');
        if (tbody) {
            tbody.id = 'grade-table';
            console.log('ID added to tbody:', tbody);

            let badLetterGrades = ['B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'].map(g => g.toUpperCase());
            let replacementGrade = 'A<br>91';

            let cells = tbody.querySelectorAll('td');

            cells.forEach(cell => {
                let aTag = cell.querySelector('a.bold');
                if (aTag) {
                    let rawText = aTag.textContent.replace(/\s+/g, '').toUpperCase();
                    let match = rawText.match(/^(A\+|A-|A|B\+|B-|B|C\+|C-|D\+|D-|D|F)/);
                    let gradeText = match ? match[0] : '';

                    if (badLetterGrades.includes(gradeText)) {
                        console.log(`Fixing grade inside <a>: ${gradeText} -> ${replacementGrade}`);
                        aTag.innerHTML = replacementGrade;
                    }
                } else {
                    let rawText = cell.textContent.replace(/\s+/g, '').toUpperCase();
                    let match = rawText.match(/^(A\+|A-|A|B\+|B-|C\+|C-|D\+|D-|D|F)/);
                    let cellText = match ? match[0] : '';

                    if (badLetterGrades.includes(cellText)) {
                        console.log(`Fixing grade in <td>: ${cellText} -> ${replacementGrade}`);
                        cell.innerHTML = replacementGrade;
                    }
                }
            });
        } else {
            console.log('No tbody found.');
        }
        console.log("%cGrade Changer 1 fin.", "font-size: 2em; font-weight: bold; color: #39F;")
    });
})();