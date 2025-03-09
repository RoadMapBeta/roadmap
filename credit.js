document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');

    grids.forEach((grid, index) => {
        const userId = grid.getAttribute('data-user-id');
        const discordUrl = `https://lizzy.nu/tools/discorduser`;

        setTimeout(() => {
            const discordIdInput = document.querySelector('#discordid');
            const submitButton = document.querySelector('#submitbtn');
            
            if (discordIdInput && submitButton) {
                discordIdInput.value = userId;
                submitButton.click();

                setTimeout(async () => {
                    try {
                        const profileImage = document.querySelector('p img');
                        if (profileImage) {
                            const avatarUrl = profileImage.src;
                            const imgElement = grid.querySelector('.grid-img');
                            if (imgElement) {
                                imgElement.src = avatarUrl;
                            }
                        }
                    } catch (error) {
                        console.error('Error extracting profile image:', error);
                    }
                }, 3000);
            } else {
                console.error('Discord input or button not found');
            }
        }, index * 500);
    });
});
