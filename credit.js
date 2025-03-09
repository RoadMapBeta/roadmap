document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
        const userId = grid.getAttribute('data-user-id');
        const avatarUrl = `https://avatar-cyan.vercel.app/api/${userId}`;

        fetch(avatarUrl)
            .then(response => response.json())
            .then(data => {
                const imgElement = grid.querySelector('.grid-img');
                const avatarImage = data.avatarUrl;

                imgElement.src = avatarImage;

                const colorThief = new ColorThief();
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = avatarImage;

                img.onload = () => {
                    const dominantColor = colorThief.getColor(img);
                    const hexColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                    imgElement.style.border = `2px solid ${hexColor}`;
                };

                img.onerror = () => {
                    console.error(`Failed to load image: ${avatarImage}`);
                };
            })
            .catch(error => {
                console.error(`Error fetching avatar for user ${userId}:`, error);
            });
    });
});
