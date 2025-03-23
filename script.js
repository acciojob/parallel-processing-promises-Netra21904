        const output = document.getElementById("output");
        const loadingDiv = document.getElementById("loading");
        const errorDiv = document.getElementById("error");

        const imageUrls = [
            "https://picsum.photos/id/237/200/300",
            "https://picsum.photos/id/238/200/300",
            "https://picsum.photos/id/239/200/300",
        ];

        function downloadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
                img.src = url;
            });
        }

        async function downloadImages() {
            loadingDiv.style.display = "block";
            errorDiv.textContent = "";

            try {
                const images = await Promise.all(imageUrls.map(downloadImage));
                images.forEach((img) => output.appendChild(img));
            } catch (error) {
                errorDiv.textContent = error.message;
            } finally {
                loadingDiv.style.display = "none";
            }
        }

        downloadImages();