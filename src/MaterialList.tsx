import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Product from './models/Product';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import SummaryModal from './components/SummaryModal';

export default function MaterialList() {
  // Utilities
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      if (response) setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Content State
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [cart, setCart] = useState<[] | Product[]>([]);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  // Effects
  useEffect(() => {
    fetchProducts();
  }, []);

  // Functions

  const handleOpenSummaryModal = () => setIsSummaryModalOpen(true);
  const handleCloseSummaryModal = () => setIsSummaryModalOpen(false);

  const handleAddToCart = (product: Product) => {
    console.log(product);
    setCart([...cart, product]);
  };

  // Render
  return (
    <>
      <Grid container spacing={2}>
        <Grid item spacing={2} xs={8}>
          <Typography fontWeight={500}>
            Total Items in Cart: {totalItems}
          </Typography>
        </Grid>
        <Grid style={{ margin: '0 auto' }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleOpenSummaryModal}
          >
            View Cart
          </Button>
        </Grid>

        <Grid
          container
          spacing={2}
          alignItems="stretch"
          style={{ marginTop: 30 }}
        >
          {products.map((e: Product) => (
            <Grid key={e.id} item xs={4} style={{ display: 'flex' }}>
              <ProductCard
                product={e}
                id={e.id}
                image={e.image}
                title={e.title}
                description={e.description}
                onAddToCart={handleAddToCart}
                totalItems={totalItems}
                setTotalItems={setTotalItems}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <SummaryModal
        cartItems={cart}
        open={isSummaryModalOpen}
        handleClose={handleCloseSummaryModal}
        setTotalItems={setTotalItems}
        setCart={setCart}
      />
    </>
  );
}
