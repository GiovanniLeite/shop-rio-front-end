import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styled';

export default function MainContainer({ children }) {
  return <Styled.Container>{children}</Styled.Container>;
}

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
