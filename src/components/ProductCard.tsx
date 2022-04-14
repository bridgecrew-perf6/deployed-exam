import React from 'react';
import Product from '../models/Product';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@mui/material';

const cardStyle = {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
};

const ProductCard = ({
  product,
  id,
  image,
  title,
  description,
  onAddToCart,
  totalItems,
  setTotalItems,
}: {
  product: Product;
  id: number;
  image: string;
  title: string;
  description: string;
  onAddToCart: Function;
  totalItems: number;
  setTotalItems: Function;
}) => {
  const handleClick = (product: Product) => {
    onAddToCart(product);
    setTotalItems(totalItems + 1);
  };

  return (
    <Card key={id} sx={cardStyle}>
      <CardMedia
        component="img"
        height="240"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${description.slice(0, 200)}...`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{ margin: '0 auto' }}
          variant="contained"
          size="small"
          onClick={() => handleClick(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
