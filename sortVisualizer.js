let delay = 1000; // Default delay between swaps for visualization

// Speed control
document.getElementById('speed').addEventListener('input', function() {
    delay = this.value;
    document.getElementById('speedValue').textContent = `${this.value} ms`;
});

// Start the sorting algorithm
function startSort() {
    let numbersInput = document.getElementById('numbers').value.split(',').map(Number);
    
    // Allow 0 and filter out NaN
    numbersInput = numbersInput.filter(num => !isNaN(num));

    if (numbersInput.length === 0) {
        alert("Please enter valid comma-separated numbers!");
        return;
    }

    let algorithm = document.getElementById('algorithm').value;

    // Display the array
    createArray(numbersInput);

    // Select the sorting algorithm
    if (algorithm === 'bubble') {
        bubbleSort(numbersInput);
    } else if (algorithm === 'selection') {
        selectionSort(numbersInput);
    } else if (algorithm === 'insertion') {
        insertionSort(numbersInput);
    } else if (algorithm === 'merge') {
        mergeSort(numbersInput);
    } else if (algorithm === 'quick') {
        quickSort(numbersInput);
    }
}

// Create array representation
function createArray(numbers) {
    let arrayContainer = document.getElementById('array');
    arrayContainer.innerHTML = '';  // Clear previous representation

    // Create and append elements for each number
    numbers.forEach(num => {
        let element = document.createElement('div');
        element.classList.add('element');
        element.textContent = num;  // Show the number
        arrayContainer.appendChild(element);
    });
}

// Helper function to swap elements and update the array
async function swap(elements, arr, i, j) {
    let elementI = elements[i];
    let elementJ = elements[j];

    elementI.style.backgroundColor = 'red'; // Highlight element I
    elementJ.style.backgroundColor = 'red'; // Highlight element J

    await sleep(delay);

    // Swap the values in the array
    [arr[i], arr[j]] = [arr[j], arr[i]];

    // Update the text of the elements
    elementI.textContent = arr[i];
    elementJ.textContent = arr[j];

    // Display explanation
    document.getElementById('comparison').textContent = `Swapping ${arr[j]} and ${arr[i]}.`;

    // Reset color after swap
    elementI.style.backgroundColor = '#4CAF50';
    elementJ.style.backgroundColor = '#4CAF50';
}

// Helper function to simulate a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Selection Sort with Visualization
async function selectionSort(arr) {
    let elements = document.getElementsByClassName('element');
    let len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        elements[i].style.backgroundColor = 'yellow';
        document.getElementById('comparison').textContent = `Step ${i + 1}: Select minimum from [${arr.slice(i).join(', ')}]`;

        for (let j = i + 1; j < len; j++) {
            elements[j].style.backgroundColor = 'blue';
            await sleep(delay);

            if (arr[j] < arr[minIndex]) {
                if (minIndex !== i) {
                    elements[minIndex].style.backgroundColor = '#4CAF50';
                }
                minIndex = j;
            }

            elements[j].style.backgroundColor = '#4CAF50'; // Reset color
        }

        if (minIndex !== i) {
            await swap(elements, arr, i, minIndex);
        }

        elements[i].style.backgroundColor = 'green'; // Sorted element
    }

    elements[len - 1].style.backgroundColor = 'green';
    document.getElementById('comparison').textContent = `Array sorted: [${arr.join(', ')}]`;
}

// Bubble Sort with Visualization
async function bubbleSort(arr) {
    let elements = document.getElementsByClassName('element');
    let len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        let swapped = false;

        for (let j = 0; j < len - 1 - i; j++) {
            elements[j].style.backgroundColor = 'blue';
            elements[j + 1].style.backgroundColor = 'blue';

            await sleep(delay);

            if (arr[j] > arr[j + 1]) {
                await swap(elements, arr, j, j + 1);
                swapped = true;
            }

            elements[j].style.backgroundColor = '#4CAF50';
            elements[j + 1].style.backgroundColor = '#4CAF50';
        }

        elements[len - 1 - i].style.backgroundColor = 'green'; // Sorted element

        if (!swapped) break;
    }

    document.getElementById('comparison').textContent = `Array sorted: [${arr.join(', ')}]`;
}

// Insertion Sort with Visualization
async function insertionSort(arr) {
    let elements = document.getElementsByClassName('element');
    let len = arr.length;

    for (let i = 1; i < len; i++) {
        let key = arr[i];
        let j = i - 1;

        elements[i].style.backgroundColor = 'yellow';
        await sleep(delay);

        while (j >= 0 && arr[j] > key) {
            elements[j + 1].style.backgroundColor = 'red';
            arr[j + 1] = arr[j];
            elements[j + 1].textContent = arr[j];
            j--;

            await sleep(delay);

            elements[j + 1].style.backgroundColor = '#4CAF50';
        }

        arr[j + 1] = key;
        elements[j + 1].textContent = key;

        elements[i].style.backgroundColor = 'green'; // Sorted element
    }

    document.getElementById('comparison').textContent = `Array sorted: [${arr.join(', ')}]`;
}

// Merge Sort with Visualization
async function mergeSort(arr) {
    let elements = document.getElementsByClassName('element');
    let len = arr.length;
    
    await mergeSortHelper(arr, 0, len - 1, elements);
    document.getElementById('comparison').textContent = `Array sorted: [${arr.join(', ')}]`;
}

async function mergeSortHelper(arr, left, right, elements) {
    if (left < right) {
        let mid = Math.floor((left + right) / 2);
        await mergeSortHelper(arr, left, mid, elements);
        await mergeSortHelper(arr, mid + 1, right, elements);
        await merge(arr, left, mid, right, elements);
    }
}

async function merge(arr, left, mid, right, elements) {
    let leftArray = arr.slice(left, mid + 1);
    let rightArray = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        elements[k].style.backgroundColor = 'yellow';
        await sleep(delay);

        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            elements[k].textContent = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            elements[k].textContent = rightArray[j];
            j++;
        }
        k++;
        elements[k - 1].style.backgroundColor = '#4CAF50'; // Reset color
    }

    while (i < leftArray.length) {
        arr[k] = leftArray[i];
        elements[k].textContent = leftArray[i];
        i++;
        k++;
    }

    while (j < rightArray.length) {
        arr[k] = rightArray[j];
        elements[k].textContent = rightArray[j];
        j++;
        k++;
    }
}

// Quick Sort with Visualization
async function quickSort(arr) {
    let elements = document.getElementsByClassName('element');
    await quickSortHelper(arr, 0, arr.length - 1, elements);
    document.getElementById('comparison').textContent = `Array sorted: [${arr.join(', ')}]`;
}

async function quickSortHelper(arr, low, high, elements) {
    if (low < high) {
        let pivotIndex = await partition(arr, low, high, elements);
        await quickSortHelper(arr, low, pivotIndex - 1, elements);
        await quickSortHelper(arr, pivotIndex + 1, high, elements);
    }
}

async function partition(arr, low, high, elements) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        elements[j].style.backgroundColor = 'blue';
        await sleep(delay);

        if (arr[j] < pivot) {
            i++;
            await swap(elements, arr, i, j);
        }

        elements[j].style.backgroundColor = '#4CAF50'; // Reset color
    }
    
    await swap(elements, arr, i + 1, high); // Place pivot in the correct position
    return i + 1;
}

// Dark mode toggle
document.getElementById('modeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});
