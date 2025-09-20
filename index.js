// V A R I A B L E S
let allRows;
let authorsCountList = [];

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    allRows = document.querySelectorAll("#autores tr");
});

/**
 * Scrapes author names from the table rows, formats them, and logs them to the console.
 */
function scrapeAuthors() {
    let authorOrder = 1;

    for (const row of allRows) {
        let authorAnchor = row.querySelector("td a");

        if (authorAnchor) {
            let authorName = authorAnchor.innerText;
            let firstName, lastName, fullName;

            // Fallback to the second cell if the first one is empty
            if (!authorName) {
                authorAnchor = row.querySelector("td:nth-child(2) a");
                if (authorAnchor) {
                   authorName = authorAnchor.innerText;
                }
            }
            
            if (!authorName) continue; // Skip if no author name is found

            // Handle names in "LastName, FirstName" format
            if (authorName.includes(",")) {
                const nameParts = authorName.split(",");
                firstName = nameParts[1].trim();
                lastName = nameParts[0].trim();
                fullName = `${firstName} ${lastName}`;
            } else {
                fullName = authorName;
            }

            console.log(`Author No. ${authorOrder}: ${fullName}`);
            authorOrder++;
        }
    }
}

/**
 * Counts the number of authors for each letter section in the table.
 */
function countAuthorsByLetter() {
    let authorCounter = 0;
    let currentLetter = "";

    for (const row of allRows) {
        const th = row.querySelector("th");

        // If the row is a letter header (e.g., 'A', 'B', 'C'...)
        if (th) {
            if (authorCounter !== 0) {
                authorsCountList.push(authorCounter);
            }

            if (currentLetter) {
                console.log(`Authors for letter ${currentLetter.toUpperCase()}: ${authorCounter}`);
            }
            
            authorCounter = 0;
            currentLetter = th.id;
        } 
        // If the row is an author entry
        else {
            authorCounter++;
        }
    }

    // After the loop, log the count for the last letter and the total
    if (currentLetter) {
        console.log(`Authors for letter ${currentLetter.toUpperCase()}: ${authorCounter}`);
        authorsCountList.push(authorCounter);
    }
    
    console.log("Total authors: " + sumArray(authorsCountList));
}

/**
 * Calculates the sum of all numbers in an array.
 * @param {number[]} arr The array of numbers.
 * @returns {number} The total sum.
 */
function sumArray(arr) {
    let sum = 0;
    for (const number of arr) {
        sum += number;
    }
    return sum;
}

/**
 * Sorts an array of numbers using the Bubble Sort algorithm.
 * @param {number[]} arr The array to be sorted.
 * @returns {number[]} The sorted array.
 */
function bubbleSort(arr) {
    const n = arr.length;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        // If no two elements were swapped by inner loop, then break
        if (!swapped) {
            break;
        }
    }
    return arr;
}