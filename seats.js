// seats.js
const seatsContainer = document.querySelector('.seats');
const selectedSeatsDisplay = document.getElementById('selected-seats');
const confirmButton = document.getElementById('confirm-button');
let selectedSeats = [];

const numRows = 5;
const seatsPerRow = 10;
let seatCounter = 1;

for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < seatsPerRow; j++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.dataset.seatNumber = seatCounter++;
        seatsContainer.appendChild(seat);

        if ((i === 1 && j === 2) || (i === 3 && j === 5) || (i===0 && j===9)) {
            seat.classList.add('occupied');
        }

        seat.addEventListener('click', () => {
            if (!seat.classList.contains('occupied')) {
                seat.classList.toggle('selected');
                const seatNumber = seat.dataset.seatNumber;

                if (seat.classList.contains('selected')) {
                    selectedSeats.push(seatNumber);
                } else {
                    selectedSeats = selectedSeats.filter(s => s !== seatNumber);
                }

                updateSelectedSeatsDisplay();
            }
        });
    }
}

function updateSelectedSeatsDisplay() {
    selectedSeatsDisplay.textContent = "Selected Seats: " + selectedSeats.join(', ');
}

confirmButton.addEventListener('click', () => {
    if (selectedSeats.length > 0) {
        alert("You have selected seats: " + selectedSeats.join(', ') + ". Booking confirmed (demo).");
        selectedSeats = [];
        updateSelectedSeatsDisplay();
        const selectedSeatElements = document.querySelectorAll('.seat.selected');
        selectedSeatElements.forEach(seat => seat.classList.add('occupied'));

    } else {
        alert("Please select at least one seat.");
    }
});