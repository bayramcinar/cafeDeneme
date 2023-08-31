import React, { useState,useEffect  }  from 'react'
import "../style/option.css"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddProduct from './addProduct';
import AddCategory from './addCategory';
import InventoryIcon from '@mui/icons-material/Inventory';
import StockTable from './stockTable';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import AddTable from './addTable';
import DeleteProduct from './deleteProduct';
import DeleteCategory from './deleteCatefory';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

function Options() {
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    const handleAddProductClick = () => {
      setShowAddProductModal(true);
    };
  
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  
    const handleAddCategoryClick = () => {
      setShowAddCategoryModal(true);
    };
  
    const [showAddStockModal, setShowAddStockModal] = useState(false);
  
    const handleAddStockClick = () => {
      setShowAddStockModal(true);
    };
  
    const [showAddTableModal, setShowAddTableModal] = useState(false);
  
    const handleAddTableClick = () => {
      setShowAddTableModal(true);
    };
  
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  
    const handleDeleteProductClick = () => {
      setShowDeleteProductModal(true);
    };

    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  
    const handleDeleteCategoryClick = () => {
      setShowDeleteCategoryModal(true);
    };
  return (
    <div>
        <h1 className='optionTitle'>Options</h1>
        <div className='row generalSettings'>
        <div className='col-lg-2 col-sm-12'>
          <div onClick={handleAddProductClick} className='addProductArea'>
              <div className='row area'>
                <div className='col-8 text'>Add Product</div>
                <div className='col-3 image'>
                  {<AddCircleIcon sx={{width:35}}/>}
                </div>
              </div>
          </div>
        </div>
        <div className='col-lg-2 col-sm-12'>
          <div onClick={handleAddCategoryClick} className='addCategoryArea'>
              <div className='row area'>
                <div className='col-8 text'>Add Category</div>
                <div className='col-3 image'>
                  {<AddCircleIcon sx={{width:35}}/>}
                </div>
              </div>
          </div>
        </div>
        <div className='col-lg-2 col-sm-12'>
          <div onClick={handleAddStockClick} className='addStockArea'>
              <div className='row area'>
                <div className='col-8 text'>Add Stock</div>
                <div className='col-3 image'>
                  {<InventoryIcon sx={{width:35}}/>}
                </div>
              </div>
          </div>
        </div>
        <div className='col-lg-2 col-sm-12'>
          <div onClick={handleAddTableClick} className='addTableArea'>
              <div className='row area'>
                <div className='col-8 text'>Add Table</div>
                <div className='col-3 image'>
                  {<TableRestaurantIcon sx={{width:35}}/>}
                </div>
              </div>
          </div>
        </div>
        <div className='col-lg-2 col-sm-12'>
          <div onClick={handleDeleteProductClick} className='deleteArea'>
              <div className='row area'>
                <div className='col-8 text'>Delete Product</div>
                <div className='col-3 image'>
                  {<DeleteSweepIcon sx={{width:35}}/>}
                </div>
              </div>
          </div>
        </div>
        <div className='col-lg-2 col-sm-12'>
          <div onClick={handleDeleteCategoryClick} style={{backgroundColor:"#FF6969"}} className='deleteArea'>
              <div className='row area'>
                <div className='col-8 text'>Delete Category</div>
                <div className='col-3 image'>
                  {<DeleteForeverIcon sx={{width:35}}/>}
                </div>
              </div>
          </div>
        </div>
        <AddProduct show={showAddProductModal} onClose={() => setShowAddProductModal(false)} />
        <AddCategory show={showAddCategoryModal} onClose={() => setShowAddCategoryModal(false)} />
        <StockTable show={showAddStockModal} onClose={() => setShowAddStockModal(false)}/>
        <AddTable show={showAddTableModal} onClose={() => setShowAddTableModal(false)}/>
        <DeleteProduct show={showDeleteProductModal} onClose={() => setShowDeleteProductModal(false)}/>
        <DeleteCategory show={showDeleteCategoryModal} onClose={() => setShowDeleteCategoryModal(false)}/>
        </div>
    </div>
  )
}

export default Options
