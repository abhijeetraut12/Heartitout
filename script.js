document.addEventListener('DOMContentLoaded', () => {
    // Your existing code...

    // Get the submit button
    const submitBtn = document.getElementById('submitBtn');

    // Add an event listener to the submit button
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Reset radio buttons and checkboxes to their default state
        document.querySelectorAll('input[type="radio"]').forEach((radio) => {
            radio.checked = false;
        });

        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = false;
        });

        // Reset the dropdown to its first option
        document.getElementById('cars').selectedIndex = 0;

        // Show the alert message
        alert('Responses recorded!');
    });

});


document.addEventListener('DOMContentLoaded', () => {
    const queries = ['cars', 'trucks', 'motorcycles', 'racing'];

    queries.forEach(query => {
        const button = document.getElementById(`btn-${query}`);
        const contentDiv = document.getElementById(`content-${query}`);
        const arrow = button.querySelector('.dropdown-arrow');
        
        button.addEventListener('click', async () => {
            // Check if the content is already visible
            if (contentDiv.style.display === 'flex') {
                // If visible, hide the content
                contentDiv.style.display = 'none';
                arrow.classList.remove('inverted');
            } else {
                // Hide all other sections
                document.querySelectorAll('.accordion-content').forEach(div => {
                    div.style.display = 'none';
                });
                document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
                    arrow.classList.remove('inverted');
                });

                // Show the content for the clicked button
                contentDiv.style.display = 'flex';
                arrow.classList.add('inverted');

                // Load the content if it's not already loaded
                if (!contentDiv.hasChildNodes()) {
                    const shows = await fetchShows(query);
                    shows.forEach(show => {
                        contentDiv.appendChild(createCard(show));
                    });
                }
            }
        });
    });



    async function fetchShows(query) {
        const response = await fetch(`http://api.tvmaze.com/search/shows?q=${query}`);
        const data = await response.json();
        return data.slice(0, 3).map(item => ({
            name: item.show.name,
            type: item.show.type,
            summary: item.show.summary,
            url: item.show.url,
            price: Math.floor(Math.random() * 10000) + 1000 // Random price for demonstration
        }));
    }

    function createCard(show) {
        // Create a container div to hold both the type and the card
        const container = document.createElement('div');
        container.className = 'card-container';

        // Create the type element and add it to the container
        const type = document.createElement('div');
        type.className = 'card-type';
        type.textContent = show.type;
        container.appendChild(type);

        // Create the card div and add it to the container
        const card = document.createElement('div');
        card.className = `card type-${show.type.toLowerCase()}`;
        
        const title = document.createElement('h3');
        title.textContent = show.name;
        card.appendChild(title);
        
        const summary = document.createElement('p');
        summary.innerHTML = show.summary;
        card.appendChild(summary);
        
        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = `Price: ${show.price}/-`;
        card.appendChild(price);
        
        const link = document.createElement('a');
        link.href = show.url;
        link.textContent = 'Click';
        link.target = '_blank';
        card.appendChild(link);
        
        // Append the card to the container
        container.appendChild(card);

        return container;
    }
});

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

document.querySelector('.next').addEventListener('click', () => {
    changeSlide(currentIndex + 1);
});

document.querySelector('.prev').addEventListener('click', () => {
    changeSlide(currentIndex - 1);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        changeSlide(index);
    });
});

function changeSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

// Adding click event for the "Slider Button"
document.querySelector('.slider-button').addEventListener('click', () => {
    changeSlide(currentIndex + 1);
});

// Auto-change slide every 5 seconds (optional)
setInterval(() => {
    changeSlide(currentIndex + 1);
}, 5000);
