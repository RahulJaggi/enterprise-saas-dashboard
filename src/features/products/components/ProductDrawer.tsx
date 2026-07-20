import React from 'react';
import { Drawer } from '../../../components/ui/Drawer';
import { ProductStatusBadge } from './ProductStatusBadge';
import { Tag, DollarSign, Package, Calendar, Award } from 'lucide-react';
import { Product } from '../types/product.types';

interface ProductDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Product Specification & Pricing" size="md">
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md"
          />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{product.name}</h3>
            <p className="text-xs font-mono text-slate-400 mt-0.5">{product.sku}</p>
          </div>
          <ProductStatusBadge status={product.status} />
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">List Price / Net</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  ${product.price.toLocaleString()}{' '}
                  {product.discount > 0 && (
                    <span className="text-emerald-500 text-xs font-bold ml-1">
                      (${discountedPrice.toFixed(2)})
                    </span>
                  )}
                </p>
              </div>
              {product.discount > 0 && (
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 font-bold rounded-lg text-xs">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <Package className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Available Stock</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{product.stock} Units</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <Tag className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Category</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{product.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <Award className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Brand Provider</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{product.brand}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Listed Date</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{product.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
