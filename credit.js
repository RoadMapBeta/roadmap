document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
        const userId = grid.getAttribute('data-user-id');
        const discordUrl = `https://discordlookup.com/user/${userId}`;

        fetch(discordUrl)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const avatarImage = doc.querySelector('a[href*="cdn.discordapp.com/avatars/"] img');

                if (avatarImage) {
                    const avatarUrl = avatarImage.src;
                    const imgElement = grid.querySelector('.grid-img');
                    imgElement.src = avatarUrl;

                    const colorThief = new ColorThief();
                    const img = new Image();
                    img.crossOrigin = "Anonymous";
                    img.src = `https://corsproxy.io/?url=${encodeURIComponent(avatarUrl)}`;

                    img.onload = () => {
                        const dominantColor = colorThief.getColor(img);
                        const hexColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                        imgElement.style.border = `2px solid ${hexColor}`;
                    };
                }
            });
    });
});
