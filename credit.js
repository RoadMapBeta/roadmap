document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');
    const colorThief = new ColorThief();

    const fetchAvatars = async () => {
        const avatarPromises = Array.from(grids).map(grid => {
            const userId = grid.getAttribute('data-user-id');
            const avatarUrl = `https://avatar-cyan.vercel.app/api/${userId}`;
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

                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.crossOrigin = 'Anonymous';
                        img.src = avatarImage;

                        img.onload = () => {
                            const dominantColor = colorThief.getColor(img);
                            const hexColor = rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]});
                            imgElement.style.border = 2px solid ${hexColor};
                            resolve();
                        };

                        img.onerror = () => reject(Failed to load image: ${avatarImage});
                    });
                })
                .catch(error => {
                    console.error(Error fetching avatar for user ${userId}:, error);
                });
        });

        await Promise.all(avatarPromises);
    };

    fetchAvatars();
});
