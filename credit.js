document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');
    const colorThief = new ColorThief();

    grids.forEach(grid => {
        const imgElement = grid.querySelector('.grid-img');
        const userId = grid.getAttribute('data-user-id');
        const avatarHash = imgElement.getAttribute('alt'); 
        const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=1024`;

        imgElement.src = avatarUrl;

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = avatarUrl;

        img.onload = () => {
            const dominantColor = colorThief.getColor(img);
            const hexColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
            imgElement.style.border = `2px solid ${hexColor}`;
        };

        img.onerror = () => {
            console.error(`Failed to load image: ${avatarUrl}`);
        };
    });
});
