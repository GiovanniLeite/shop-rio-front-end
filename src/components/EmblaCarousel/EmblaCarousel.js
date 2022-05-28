/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import { Thumb } from './EmblaCarouselThumb';
import { Container } from './styled';

// eslint-disable-next-line
const EmblaCarousel = ({ slides, mediaByIndex }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    selectedClass: '',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs],
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <Container>
      <div className="embla">
        <div className="embla__viewport" ref={mainViewportRef}>
          <div className="embla__container">
            {
              // eslint-disable-next-line
              slides.map((index) => (
                <div className="embla__slide" key={index}>
                  <div className="embla__slide__inner">
                    <img className="embla__slide__img" src={mediaByIndex(index)} alt="A cool cat." />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div className="embla embla--thumb">
        <div className="embla__viewport" ref={thumbViewportRef}>
          <div className="embla__container embla__container--thumb">
            {
              // eslint-disable-next-line
              slides.map((index) => (
                <Thumb
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  imgSrc={mediaByIndex(index)}
                  key={index}
                />
              ))
            }
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EmblaCarousel;
