document.addEventListener('DOMContentLoaded', () => {
    
    const submitBtn = document.getElementById('submitBtn');

   
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); 

        
        document.querySelectorAll('input[type="radio"]').forEach((radio) => {
            radio.checked = false;
        });

        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = false;
        });

        document.getElementById('cars').selectedIndex = 0;

     
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
            
            if (contentDiv.style.display === 'flex') {
                
                contentDiv.style.display = 'none';
                arrow.classList.remove('inverted');
            } else {
                
                document.querySelectorAll('.accordion-content').forEach(div => {
                    div.style.display = 'none';
                });
                document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
                    arrow.classList.remove('inverted');
                });

                contentDiv.style.display = 'flex';
                arrow.classList.add('inverted');


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
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
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

        const container = document.createElement('div');
        container.className = 'card-container';


        const type = document.createElement('div');
        type.className = 'card-type';
        type.textContent = show.type;
        container.appendChild(type);

     
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


document.querySelector('.slider-button').addEventListener('click', () => {
    changeSlide(currentIndex + 1);
});


setInterval(() => {
    changeSlide(currentIndex + 1);
}, 5000);
