import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { LoadingState } from '../../components/common/LoadingState';
import { Plus, Search, Star, PackagePlus } from 'lucide-react';
import { useGetProductsQuery, useAddProductMutation } from '../../services/baseApi';

export const ProductsView: React.FC = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Software' as const,
    price: 999,
    stock: 50,
    status: 'In Stock' as const,
  });

  if (isLoading) return <LoadingState label="Loading product catalog..." />;

  const filtered = products?.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct(formData);
    setIsModalOpen(false);
    setFormData({ name: '', sku: '', category: 'Software', price: 999, stock: 50, status: 'In Stock' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products & API Licenses"
        description="SaaS product suite, cloud SKU catalog, and pricing tiers"
        action={
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
            Add New Product
          </Button>
        }
      />

      <Card glass className="p-4 flex justify-between items-center">
        <div className="w-72">
          <Input
            placeholder="Search by product name or SKU..."
            leftIcon={<Search className="w-4 h-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">Total Products: {filtered?.length || 0}</span>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered?.map((prod) => (
          <Card key={prod.id} glass className="p-5 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant={prod.status === 'In Stock' ? 'success' : prod.status === 'Low Stock' ? 'warning' : 'danger'} size="sm">
                  {prod.status}
                </Badge>
                <div className="flex items-center text-xs font-bold text-amber-400 gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> {prod.rating}
                </div>
              </div>
              <h4 className="mt-3 text-base font-bold text-slate-900 dark:text-slate-100">{prod.name}</h4>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">{prod.sku}</p>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">${prod.price.toLocaleString()}</span>
                <span className="text-xs text-slate-400 font-medium">{prod.salesCount} Sales</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span>Category: {prod.category}</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Stock: {prod.stock}</span>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Product / License">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input label="Product Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <Input label="SKU Code" required value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} />
          <Input label="Price (USD)" type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} />
          <Input label="Available Licenses / Stock" type="number" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} />
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" leftIcon={<PackagePlus className="w-4 h-4" />}>Save Product</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
