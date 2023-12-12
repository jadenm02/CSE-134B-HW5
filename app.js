class RatingWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .star {
                    cursor: pointer;
                    color: var(--star-unselected-color, gray);
                }
                .star.selected {
                    color: var(--star-selected-color, gold);
                }
                /* Additional styles */
            </style>
            <div id="stars">
                <span class="star">☆</span>
                <span class="star">☆</span>
                <span class="star">☆</span>
                <span class="star">☆</span>
                <span class="star">☆</span>
            </div>
            <p id="ratingMessage"></p>
        `;

        this.initEventListeners();
    }

    initEventListeners() {
        const stars = this.shadowRoot.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('mouseover', () => this.handleHover(index));
            star.addEventListener('click', () => this.handleSubmit(index + 1));
        });
    }

    handleHover(index) {
        const stars = this.shadowRoot.querySelectorAll('.star');
        stars.forEach((star, i) => {
            star.classList[i <= index ? 'add' : 'remove']('selected');
        });
    }

    handleSubmit(rating) {
        const messageElement = this.shadowRoot.getElementById('ratingMessage');
        if (rating >= 4) {
            messageElement.textContent = 'Thank you for the positive rating!';
        } else {
            messageElement.textContent = "We'll try to do better!";
        }

        fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Sent-By': 'JS'
            },
            body: JSON.stringify({ rating, sentBy: 'JS' })
        })
        .then(response => response.json())
        .then(data => console.log(data));
    }
}

customElements.define('rating-widget', RatingWidget);