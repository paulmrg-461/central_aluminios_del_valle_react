import React, { useState, useEffect } from 'react';
import { RefreshCw, Package, Search, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { InventoryService } from '../services/inventoryService';
import { InventoryData, InventoryItem } from '../types/inventory';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState<InventoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadInventoryData();
  }, []);

  const loadInventoryData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await InventoryService.getInventoryData();
      setInventoryData(data);
    } catch (err) {
      setError('Error al cargar los datos del inventario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const data = await InventoryService.refreshInventory();
      setInventoryData(data);
    } catch (err) {
      setError('Error al actualizar los datos del inventario');
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredItems = inventoryData?.items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { status: 'sin-stock', color: 'text-red-600', bg: 'bg-red-100', icon: AlertTriangle };
    if (quantity <= 20) return { status: 'stock-bajo', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertTriangle };
    return { status: 'stock-bueno', color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
  };

  const totalItems = inventoryData?.items.length || 0;
  const totalQuantity = inventoryData?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const lowStockItems = inventoryData?.items.filter(item => item.quantity <= 20).length || 0;
  const outOfStockItems = inventoryData?.items.filter(item => item.quantity === 0).length || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando inventario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Package className="mr-3 text-blue-600" />
                Inventario
              </h1>
              <p className="text-gray-600 mt-1">Sistema de gestión de inventario - Sistema 5020</p>
            </div>
            <div className="flex items-center space-x-4">
              {inventoryData?.lastUpdated && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Actualizado: {new Date(inventoryData.lastUpdated).toLocaleString('es-ES')}
                </div>
              )}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Actualizando...' : 'Actualizar'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Productos</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cantidad Total</p>
                <p className="text-2xl font-bold text-gray-900">{totalQuantity}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
                <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sin Stock</p>
                <p className="text-2xl font-bold text-gray-900">{outOfStockItems}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Productos ({filteredItems.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fila
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item, index) => {
                  const stockStatus = getStockStatus(item.quantity);
                  const StatusIcon = stockStatus.icon;
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-semibold">{item.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {stockStatus.status === 'sin-stock' && 'Sin Stock'}
                          {stockStatus.status === 'stock-bajo' && 'Stock Bajo'}
                          {stockStatus.status === 'stock-bueno' && 'Stock Bueno'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Fila {item.row}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron productos</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Intenta con un término de búsqueda diferente.' : 'No hay productos en el inventario.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Google Sheets Info */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Conectado a Google Sheets
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Los datos se obtienen en tiempo real de la hoja "INVENTARIO" en Google Sheets.</p>
                <p className="mt-1">
                  <strong>Columnas:</strong> A (Nombres de productos), C (Cantidades disponibles)
                </p>
                <p className="mt-1">
                  <strong>Rango:</strong> Desde la fila 3 en adelante
                </p>
                <p className="mt-1">
                  <strong>Estado:</strong> API Key configurada ✓
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;