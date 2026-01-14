import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Filter, Download, Plus, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import './DataTable.css';

/**
 * Modern Premium DataTable Component
 * 
 * @param {Object[]} columns - Array of column definitions
 * @param {Object[]} data - Array of data objects
 * @param {string} title - Table title (optional)
 * @param {boolean} isLoading - Loading state
 * @param {Object[]} actions - Row actions [{ icon, label, onClick, variant }]
 * @param {Function} onRowClick - Callback for row click
 * @param {ReactNode} renderToolbar - Custom toolbar content (e.g. Add Button)
 * @param {string} searchPlaceholder - Placeholder for search input
 * @param {boolean} selectable - Enable row selection
 * @param {Function} onSelectionChange - Callback for selection change
 */
const DataTable = ({
    columns,
    data,
    title,
    isLoading,
    actions,
    onRowClick,
    renderToolbar,
    renderRowActions,
    searchPlaceholder = "Rechercher...",
    selectable = false,
    onSelectionChange
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [filters, setFilters] = useState({});

    // Filter and Search Logic
    const filteredData = useMemo(() => {
        if (!data) return [];

        return data.filter(item => {
            // Global Search
            const matchesSearch = Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Column Filters (basic implementation)
            const matchesFilters = Object.entries(filters).every(([key, value]) => {
                if (!value || value === 'all') return true;
                return String(item[key]) === String(value);
            });

            return matchesSearch && matchesFilters;
        });
    }, [data, searchTerm, filters]);

    // Sorting Logic
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Pagination Logic
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Handlers
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const newSelected = new Set(paginatedData.map(row => row.id));
            setSelectedRows(newSelected);
            onSelectionChange?.(Array.from(newSelected));
        } else {
            setSelectedRows(new Set());
            onSelectionChange?.([]);
        }
    };

    const handleSelectRow = (id) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
        onSelectionChange?.(Array.from(newSelected));
    };

    const handleExport = () => {
        // Basic csv export implementation
        if (!data.length) return;

        const headers = columns.map(col => col.label).join(',');
        const rows = data.map(row =>
            columns.map(col => JSON.stringify(row[col.key] || '')).join(',')
        );

        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${title || 'export'}_${new Date().toISOString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="datatable-wrapper fade-in">
            {/* Header / Toolbar */}
            <div className="datatable-header">
                {title && <h3 className="datatable-title">{title}</h3>}

                <div className="datatable-toolbar" style={{ flex: 1, justifyContent: 'flex-end' }}>
                    {/* Search */}
                    <div className="datatable-search">
                        <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filters Placeholder - customizable prop could add actual filters here */}
                    {Object.keys(filters).length > 0 && (
                        <div className="badge badge-primary">
                            Filtres actifs ({Object.keys(filters).length})
                        </div>
                    )}

                    {/* Extras */}
                    <button className="btn btn-secondary btn-sm" onClick={handleExport} title="Exporter CSV">
                        <Download size={16} />
                    </button>

                    {/* Custom Toolbar Actions (e.g. Add Button) */}
                    {renderToolbar}
                </div>
            </div>

            {/* Table Area */}
            <div className="datatable-container">
                <table className="datatable">
                    <thead>
                        <tr>
                            {selectable && (
                                <th style={{ width: '40px', padding: '0 1rem' }}>
                                    <input
                                        type="checkbox"
                                        className="datatable-checkbox"
                                        onChange={handleSelectAll}
                                        checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                                    />
                                </th>
                            )}
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={col.sortable ? 'sortable' : ''}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                    style={{ width: col.width, textAlign: col.align || 'left' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start' }}>
                                        {col.headerRender ? col.headerRender() : col.label}
                                        {col.sortable && sortConfig.key === col.key && (
                                            sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                                        )}
                                    </div>
                                </th>
                            ))}
                            {(actions || renderRowActions) && <th style={{ width: '80px', textAlign: 'right' }}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            // Skeleton Loading State
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="skeleton-row">
                                    {selectable && <td><span style={{ width: '20px' }} /></td>}
                                    {columns.map((_, j) => (
                                        <td key={j}><span></span></td>
                                    ))}
                                    {actions && <td><span></span></td>}
                                </tr>
                            ))
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    onClick={() => onRowClick && onRowClick(row)}
                                    style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                                >
                                    {selectable && (
                                        <td style={{ padding: '0 1rem' }} onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                className="datatable-checkbox"
                                                checked={selectedRows.has(row.id)}
                                                onChange={() => handleSelectRow(row.id)}
                                            />
                                        </td>
                                    )}
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} style={{ textAlign: col.align || 'left' }}>
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}
                                    {(actions || renderRowActions) && (
                                        <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                {renderRowActions ? renderRowActions(row) : actions.map((action, actionIndex) => (
                                                    <button
                                                        key={actionIndex}
                                                        onClick={() => action.onClick(row)}
                                                        className={`btn-icon ${action.variant === 'danger' ? 'text-red-500 hover:bg-red-50' : ''}`}
                                                        title={action.label}
                                                        style={action.variant === 'danger' ? { color: 'var(--danger)' } : {}}
                                                    >
                                                        {action.icon}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}>
                                    <div className="datatable-empty">
                                        <Filter size={48} style={{ opacity: 0.1 }} />
                                        <p>Aucun résultat trouvé</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            {!isLoading && data.length > 0 && (
                <div className="datatable-footer">
                    <div className="datatable-info">
                        Affichage de {((currentPage - 1) * pageSize) + 1} à {Math.min(currentPage * pageSize, sortedData.length)} sur {sortedData.length} résultats
                    </div>
                    <div className="datatable-pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {/* Simple page numbers */}
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            // Logic to show window of pages could be improved for many pages
                            let pageNum = currentPage;
                            if (totalPages <= 5) pageNum = i + 1;
                            else if (currentPage <= 3) pageNum = i + 1;
                            else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                            else pageNum = currentPage - 2 + i;

                            return (
                                <button
                                    key={pageNum}
                                    className={currentPage === pageNum ? 'active' : ''}
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                        >
                            <ChevronRight size={16} />
                        </button>

                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            style={{
                                marginLeft: '1rem',
                                padding: '0.25rem 0.5rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                fontSize: '0.875rem'
                            }}
                        >
                            <option value={10}>10 / page</option>
                            <option value={20}>20 / page</option>
                            <option value={50}>50 / page</option>
                            <option value={100}>100 / page</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
