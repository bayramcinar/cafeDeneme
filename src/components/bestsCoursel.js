import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Skeleton from '@mui/material/Skeleton';
import "../style/carousel.css"; 

function BestsCoursel({ isLoading, images }) {
    return (
        <div className="carousel-container">
            <Carousel>
                {images.map((image, index) => (
                    <Carousel.Item key={index} interval={2500}>
                        {isLoading ? (
                            <Skeleton variant="rectangular" width="100%" height={200} />
                        ) : (
                            <img
                                className="d-block w-100"
                                    src={`http://localhost:8081/images/${image.image}`}
                                alt={`Image ${index + 1}`}
                            />
                        )}
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default BestsCoursel;
