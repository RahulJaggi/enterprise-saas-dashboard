import React from 'react';
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
import { CreateProductInput } from '../types/product.types';
import { toast } from '../../../components/ui/Toast';

const createProductSchema = z.object({
  name: z.string().min(2, 'Product name required'),
  sku: z.string().min(3, 'SKU code required'),
  category: z.string().min(2, 'Category required'),
  brand: z.string().min(2, 'Brand required'),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  discount: z.coerce.number().min(0).max(100, 'Discount must be 0-100%'),
  stock: z.coerce.number().min(0, 'Stock must be non-negative'),
  status: z.enum(PRODUCT_STATUSES),
  image: z.string().url('Invalid image URL'),
});

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitProduct: (data: CreateProductInput) => Promise<void>;
}

export const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
  onSubmitProduct,
}) => {
  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      sku: '',
      category: 'Software License',
      brand: 'Enterprise Core',
      price: 999,
      discount: 0,
      stock: 50,
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
    },
  });

  const handleSubmit = async (data: CreateProductInput) => {
    try {
      await onSubmitProduct(data);
      toast.success('Product created successfully');
      form.reset();
      onClose();
    } catch {
      toast.error('Failed to create product');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Enterprise Product / SKU" maxWidth="lg">
      <Form form={form} onSubmit={handleSubmit} className="space-y-4">
        <FormInput name="name" label="Product Name" placeholder="e.g. Enterprise Cloud Suite" required />
        <FormInput name="sku" label="SKU Code" placeholder="SKU-CLD-999" required />

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
          <FormSubmitButton>Create Product</FormSubmitButton>
        </div>
      </Form>
    </Modal>
  );
};
