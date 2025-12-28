import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class DocumentListScreen extends StatefulWidget {
  const DocumentListScreen({super.key});

  @override
  State<DocumentListScreen> createState() => _DocumentListScreenState();
}

class _DocumentListScreenState extends State<DocumentListScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _selectedFilter = 'Tous';

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Mes Documents'),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: Colors.white,
          tabs: const [
            Tab(text: 'Factures'),
            Tab(text: 'Devis'),
            Tab(text: 'Proformas'),
          ],
        ),
      ),
      body: Column(
        children: [
          // Filters
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.white,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _buildFilterChip('Tous'),
                  const SizedBox(width: 8),
                  _buildFilterChip('Brouillon'),
                  const SizedBox(width: 8),
                  _buildFilterChip('En attente'),
                  const SizedBox(width: 8),
                  _buildFilterChip('Payées'),
                  const SizedBox(width: 8),
                  _buildFilterChip('FNE Envoyées'),
                ],
              ),
            ),
          ),
          
          // Document List
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildDocumentList('invoice'),
                _buildDocumentList('quote'),
                _buildDocumentList('proforma'),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          _showCreateDocumentDialog();
        },
        backgroundColor: AppColors.primary,
        icon: const Icon(Icons.add),
        label: const Text('Créer'),
      ),
    );
  }

  Widget _buildFilterChip(String label) {
    final isSelected = _selectedFilter == label;
    return FilterChip(
      label: Text(label),
      selected: isSelected,
      onSelected: (selected) {
        setState(() {
          _selectedFilter = label;
        });
      },
      selectedColor: AppColors.primary.withOpacity(0.2),
      checkmarkColor: AppColors.primary,
      labelStyle: TextStyle(
        color: isSelected ? AppColors.primary : AppColors.textSecondary,
        fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
      ),
    );
  }

  Widget _buildDocumentList(String type) {
    // Mock data
    final documents = List.generate(10, (index) => {
      'id': 'FNE-2025-${1000 + index}',
      'client': index % 3 == 0 ? 'SARL Global Trade' : index % 3 == 1 ? 'Jean Dupont' : 'Entreprise ABC',
      'amount': '${(index + 1) * 50000} CFA',
      'date': '${20 + index}/12/2025',
      'status': index % 4 == 0 ? 'paid' : index % 4 == 1 ? 'pending' : index % 4 == 2 ? 'draft' : 'fne_generated',
    });

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: documents.length,
      itemBuilder: (context, index) {
        final doc = documents[index];
        return _buildDocumentCard(
          id: doc['id']!,
          client: doc['client']!,
          amount: doc['amount']!,
          date: doc['date']!,
          status: doc['status']!,
        );
      },
    );
  }

  Widget _buildDocumentCard({
    required String id,
    required String client,
    required String amount,
    required String date,
    required String status,
  }) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: () {
          // TODO: Navigate to document details
        },
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    id,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  _buildStatusBadge(status),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.person_outline, size: 16, color: AppColors.textSecondary),
                  const SizedBox(width: 4),
                  Text(
                    client,
                    style: const TextStyle(
                      fontSize: 14,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    amount,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: AppColors.primary,
                    ),
                  ),
                  Text(
                    date,
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.textLight,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatusBadge(String status) {
    Color color;
    String label;
    
    switch (status) {
      case 'paid':
        color = AppColors.success;
        label = 'Payée';
        break;
      case 'pending':
        color = AppColors.warning;
        label = 'En attente';
        break;
      case 'draft':
        color = AppColors.textLight;
        label = 'Brouillon';
        break;
      case 'fne_generated':
        color = AppColors.info;
        label = 'FNE Envoyée';
        break;
      default:
        color = AppColors.textSecondary;
        label = status;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: color,
        ),
      ),
    );
  }

  void _showCreateDocumentDialog() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'Créer un nouveau document',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 24),
            ListTile(
              leading: const Icon(Icons.description, color: AppColors.primary),
              title: const Text('Facture'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Navigate to create invoice
              },
            ),
            ListTile(
              leading: const Icon(Icons.assignment, color: AppColors.secondary),
              title: const Text('Devis'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Navigate to create quote
              },
            ),
            ListTile(
              leading: const Icon(Icons.receipt_long, color: AppColors.accent),
              title: const Text('Proforma'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Navigate to create proforma
              },
            ),
          ],
        ),
      ),
    );
  }
}
