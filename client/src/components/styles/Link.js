import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props =>
    props.color
      ? props.theme.color[props.color]
      : props.theme.color.primaryText};
  cursor: pointer;
  padding: 0 4px;
`;

export default StyledLink;
