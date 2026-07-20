import { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Button } from '../../../components/ui/Button';
import { ProductTable } from '../components/ProductTable';
import { ProductDrawer } from '../components/ProductDrawer';
import { CreateProductModal } from '../components/CreateProductModal';
import { EditProductModal } from '../components/EditProductModal';
import { DeleteProductDialog } from '../components/DeleteProductDialog';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types/product.types';
import { PackagePlus } from 'lucide-react';

export function ProductsPage() {
  const {
    products,
    isLoading,
    isError,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products & API Licenses"
        description="Manage enterprise software modules, cloud resource SKUs, prices, and stock inventory"
        action={
          <Button
            size="sm"
            leftIcon={<PackagePlus className="w-4 h-4" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add New Product
          </Button>
        }
      />

      <ProductTable
        products={products}
        isLoading={isLoading}
        isError={isError}
        onViewProduct={handleViewProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      <ProductDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmitProduct={async (data) => {
          await createProduct(data);
        }}
      />

      <EditProductModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmitUpdate={async (data) => {
          await updateProduct(data);
        }}
      />

      <DeleteProductDialog
        product={deletingProduct}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirmDelete={async (id) => {
          await deleteProduct(id);
        }}
      />
    </div>
  );
}

export default ProductsPage;
