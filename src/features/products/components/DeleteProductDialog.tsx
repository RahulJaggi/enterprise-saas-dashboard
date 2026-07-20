import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Product } from '../types/product.types';
import { toast } from '../../../components/ui/Toast';
import { PackageX } from 'lucide-react';

interface DeleteProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (id: string) => Promise<void>;
}

export const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  product,
  isOpen,
  onClose,
  onConfirmDelete,
}) => {
  if (!product) return null;

  const handleDelete = async () => {
    try {
      await onConfirmDelete(product.id);
      toast.success(`Product ${product.name} deleted`);
      onClose();
    } catch {
      toast.error('Failed to delete product');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete Product" maxWidth="sm">
      <div className="space-y-4 text-center">
        <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
          <PackageX className="w-6 h-6" />
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-xl border border-slate-200 dark:border-slate-800 mx-auto shadow-sm"
        />

        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{product.name}</h4>
          <p className="text-xs font-mono text-slate-400">{product.sku}</p>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Are you sure you want to delete this product SKU? This will remove it from the active catalog.
        </p>

        <div className="flex justify-center gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete Product
          </Button>
        </div>
      </div>
    </Modal>
  );
};
