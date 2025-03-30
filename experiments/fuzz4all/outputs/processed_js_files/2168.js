 

async function* fetchRandomDogImages(breeds, imageCount) {
  const url = 'https://dog.ceo/api/breed/';
  for (const breed of breeds) {
    const response = await fetch(`${url}${breed}/images/random/${imageCount}`);
    const data = await response.json();
    if (data.status === 'success') {
      yield* data.message;
    } else {
      console.error(`Failed to fetch images for breed: ${breed}`);
    }
  }
}

const displayImages = async () => {
  try {
    const breedList = ['labrador', 'beagle', 'bulldog'];
    const imageGenerator = fetchRandomDogImages(breedList, 3);
    const imageContainer = document.getElementById('dog-images');

    for await (const imageUrl of imageGenerator) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = 'Cute dog';
      img.style.width = '200px';
      img.style.margin = '10px';
      imageContainer.appendChild(img);
    }
  } catch (error) {
    console.error('Error displaying images:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  displayImages();
});

 
 
 
 

This program uses an asynchronous generator function to fetch images of different dog breeds asynchronously. It demonstrates the use of `async/await`, generator functions, and DOM manipulation in a complex yet practical manner.