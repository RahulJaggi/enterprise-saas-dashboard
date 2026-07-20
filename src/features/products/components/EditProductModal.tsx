import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../../components/ui/Modal';
import { Form } from '../../../components/forms/Form';
import { FormInput } from '../../../components/forms/FormInput';
import { FormSelect } from '../../../components/forms/FormSelect';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { Button } from '../../../components/ui/Button';
import { PRODUCT_CATEGORIES, PRODUCT_BRANDS, PRODUCT_STATUSES } from '../constants/product.constants';
import { Product, UpdateProductInput } from '../types/product.types';
import { toast } from '../../../components/ui/Toast';

const editProductSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Product name required'),
  sku: z.string().min(3, 'SKU code required'),
  category: z.string().min(2, 'Category required'),
  brand: z.string().min(2, 'Brand required'),
  price: z.coerce.number().min(1, 'Price must be > 0'),
  discount: z.coerce.number().min(0).max(100),
  stock: z.coerce.number().min(0),
  status: z.enum(PRODUCT_STATUSES),
});

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitUpdate: (data: UpdateProductInput) => Promise<void>;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSubmitUpdate,
}) => {
  const form = useForm<UpdateProductInput>({
    resolver: zodResolver(editProductSchema),
  });

  useEffect(() => {
    if (product) {
      form.reset({
        id: product.id,
        name: product.name,
        sku: product.sku,
        category: product.category,
        brand: product.brand,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        status: product.status,
      });
    }
  }, [product, form]);

  if (!product) return null;

  const handleSubmit = async (data: UpdateProductInput) => {
    try {
      await onSubmitUpdate(data);
      toast.success('Product updated successfully');
      onClose();
    } catch {
      toast.error('Failed to update product');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Product (${product.name})`} maxWidth="lg">
      <Form form={form} onSubmit={handleSubmit} className="space-y-4">
        <FormInput name="name" label="Product Name" required />
        <FormInput name="sku" label="SKU Code" required />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            name="category"
            label="Category"
            options={PRODUCT_CATEGORIES.map((c) => ({ label: c, value: c }))}
            required
          />
          <FormSelect
            name="brand"
            label="Brand Provider"
            options={PRODUCT_BRANDS.map((b) => ({ label: b, value: b }))}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormInput name="price" label="Price ($)" type="number" required />
          <FormInput name="discount" label="Discount (%)" type="number" required />
          <FormInput name="stock" label="Stock Quantity" type="number" required />
        </div>

        <FormSelect
          name="status"
          label="Stock Status"
          options={PRODUCT_STATUSES.map((s) => ({ label: s, value: s }))}
          required
        />

        <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <FormSubmitButton>Save Changes</FormSubmitButton>
        </div>
      </Form>
    </Modal>
  );
};
