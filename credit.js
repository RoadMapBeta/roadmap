document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');
    const colorThief = new ColorThief();

    const fetchAvatars = async () => {
        const avatarPromises = Array.from(grids).map(grid => {
            const username = grid.querySelector('h2')?.textContent.trim();
            const avatarUrl = `https://avatar-cyan.vercel.app/api/${username}`;

            return fetch(avatarUrl)
                .then(response => response.json())
                .then(data => {
                    const imgElement = grid.querySelector('.grid-img');
                    const displayName = data.display_name;
                    const avatarImage = data.avatarUrl;

                    const h2Element = grid.querySelector('h2');
                    if (h2Element) {
                        h2Element.textContent = displayName;
                    }

                    imgElement.src = avatarImage;

                    return new Promise(resolve => {
                        const img = new Image();
                        img.crossOrigin = 'Anonymous';
                        img.src = avatarImage;

                        img.onload = () => {
                            const dominantColor = colorThief.getColor(img);
                            const hexColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                            imgElement.style.border = `2px solid ${hexColor}`;
                            resolve();
                        };
                    });
                });
        });

        await Promise.all(avatarPromises);
    };

    fetchAvatars();
});
