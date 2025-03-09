document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');
    const colorThief = new ColorThief();

    const fetchAvatars = async () => {
        const avatarPromises = Array.from(grids).map(grid => {
            const userId = grid.getAttribute('data-user-id');
            const avatarUrl = `https://avatar-cyan.vercel.app/api/${userId}`;

            return new Promise((resolve, reject) => {
                fetch(avatarUrl)
                    .then(response => response.json())
                    .then(data => {
                        const imgElement = grid.querySelector('.grid-img');
                        const avatarImage = data.avatarUrl;

                        imgElement.src = avatarImage;

                        const img = new Image();
                        img.crossOrigin = 'Anonymous';
                        img.src = avatarImage;

                        img.onload = () => {
                            const dominantColor = colorThief.getColor(img);
                            const hexColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                            imgElement.style.border = `2px solid ${hexColor}`;
                            resolve();
                        };

                        img.onerror = () => {
                            console.error(`Failed to load image: ${avatarImage}`);
                            resolve(); 
                        };
                    })
                    .catch(error => {
                        console.error(`Error fetching avatar for user ${userId}:`, error);
                        resolve(); 
                    });
            });
        });

        await Promise.all(avatarPromises);
    };

    fetchAvatars().finally(() => {
        grids.forEach(grid => grid.style.opacity = 1); 
    });
});
