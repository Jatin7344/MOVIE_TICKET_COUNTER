document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieName = urlParams.get('movie');
    if (movieName) {
      document.write("<h2>Select Seats for " + movieName + "</h2>");
        generateSeats();
    }

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (event) => {
            const selectedSeats = JSON.stringify(getselectedSeats()); // Convert to JSON string
            const movie = urlParams.get('movie');
            document.getElementById('selectedSeats').value = selectedSeats; // Set value of hidden input
            document.getElementById('movie').value = movie;
            
        });
    }
    const confirmationDiv = document.getElementById('confirmation');
    if(confirmationDiv){
        const urlParams = new URLSearchParams(window.location.search);
        const movie = urlParams.get('movie');
        const selectedSeats = urlParams.get('selectedSeats');
        confirmationDiv.innerHTML = `<h2>🎉 Booking Confirmed!</h2><p>Thank you for booking ${movie} with us. Your selected seats are ${selectedSeats}</p>`
    }

});

let selectedSeats = [];

function generateSeats(rows = 5, seatsPerRow = 10) {
    const seatsContainer = document.querySelector('.seats');
    if(!seatsContainer) return;
    seatsContainer.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < seatsPerRow; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.addEventListener('click', () => toggleSeat(seat, i * seatsPerRow + j));
            seatsContainer.appendChild(seat);
        }
    }
}

function toggleSeat(seat, seatIndex) {
    seat.classList.toggle('selected');
    if (seat.classList.contains('selected')) {
        selectedSeats.push(seatIndex);
    } else {
        selectedSeats = selectedSeats.filter(index => index !== seatIndex);
    }
}

function getselectedSeats(){
    return selectedSeats;
}