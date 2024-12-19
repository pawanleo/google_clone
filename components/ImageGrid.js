import styles from '../styles/ImageGrid.module.css';

const dummyImages = [
  { id: 1, src: '/dummy-images/image1.jpg', title: 'Image 1' },
  { id: 2, src: '/dummy-images/image2.jpg', title: 'Image 2' },
  { id: 3, src: '/dummy-images/image3.jpg', title: 'Image 3' },
  { id: 4, src: '/dummy-images/image4.jpg', title: 'Image 4' },
];

export default function ImageGrid() {
  return (
    <div className={styles.grid}>
      {dummyImages.map((image) => (
        <div key={image.id} className={styles.imageCard}>
          <img src={image.src} alt={image.title} />
          <p>{image.title}</p>
        </div>
      ))}
    </div>
  );
}
