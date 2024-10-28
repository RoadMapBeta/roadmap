document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');
    const colorThief = new ColorThief();

    grids.forEach(grid => {
        const userId = grid.getAttribute('data-user-id');
        const avatarHash = grid.querySelector('.grid-img').getAttribute('alt'); 

        const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=1024`;

        const imgElement = grid.querySelector('.grid-img');
        imgElement.src = avatarUrl;
        imgElement.alt = avatarHash; 

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = avatarUrl;

        img.onload = () => {
            try {
                const dominantColor = colorThief.getColor(img);
                const hexColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                grid.style.border = `5px solid ${hexColor}`;
            } catch (error) {
                console.error(`Error extracting color for ${avatarUrl}:`, error);
                grid.style.border = '5px solid gray';
            }
        };

        img.onerror = () => {
            console.error(`Error loading image from ${avatarUrl}`);
            grid.style.border = '5px solid gray';
        };
    });
});
