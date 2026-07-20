import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../../components/table/DataTable';
import { Button } from '../../../components/ui/Button';
import { ProductStatusBadge } from './ProductStatusBadge';
import { Product } from '../types/product.types';
import { Eye, Edit2, Trash2 } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

export function ProductTable({
  products,
  isLoading = false,
  isError = false,
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductTableProps) {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
            className="rounded border-slate-300 text-indigo-600"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(!!e.target.checked)}
            className="rounded border-slate-300 text-indigo-600"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        header: 'Product / SKU',
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex items-center gap-3">
              <img
                src={p.image}
                alt={p.name}
                className="w-10 h-10 object-cover rounded-xl border border-slate-200 dark:border-slate-800 shrink-0"
              />
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{p.name}</p>
                <p className="text-[10px] font-mono text-slate-400">{p.sku}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'category',
        header: 'Category & Brand',
        cell: ({ row }) => (
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{row.original.category}</p>
            <p className="text-[10px] text-slate-400">{row.original.brand}</p>
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
          const p = row.original;
          const discountedPrice = p.price * (1 - p.discount / 100);
          return (
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">
                ${p.price.toLocaleString()}
              </p>
              {p.discount > 0 && (
                <span className="text-[10px] font-semibold text-emerald-500">
                  ${discountedPrice.toFixed(0)} ({p.discount}% OFF)
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ row }) => {
          const stock = row.original.stock;
          return (
            <div className="flex items-center gap-2">
              <span className="font-semibold">{stock}</span>
              <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    stock > 20
                      ? 'bg-emerald-500'
                      : stock > 0
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, (stock / 100) * 100)}%` }}
                />
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <ProductStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => <span className="font-mono text-slate-400">{row.original.createdAt}</span>,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              <Button variant="ghost" size="sm" onClick={() => onViewProduct(p)} title="View Details">
                <Eye className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEditProduct(p)} title="Edit Product">
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteProduct(p)}
                title="Delete Product"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [onViewProduct, onEditProduct, onDeleteProduct]
  );

  return (
    <DataTable
      columns={columns}
      data={products}
      isLoading={isLoading}
      isError={isError}
      searchPlaceholder="Search products by name, SKU, or category..."
    />
  );
}
