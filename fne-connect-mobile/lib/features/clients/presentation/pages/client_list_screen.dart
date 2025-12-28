import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class ClientListScreen extends StatefulWidget {
  const ClientListScreen({super.key});

  @override
  State<ClientListScreen> createState() => _ClientListScreenState();
}

class _ClientListScreenState extends State<ClientListScreen> {
  final _searchController = TextEditingController();
  
  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Mock data
    final clients = List.generate(15, (index) => {
      'name': index % 3 == 0 ? 'SARL Global Trade' : index % 3 == 1 ? 'Jean Dupont' : 'Entreprise ABC ${index + 1}',
      'phone': '+225 07 ${10 + index} ${20 + index} ${30 + index}',
      'email': 'client${index + 1}@example.com',
      'totalSpent': '${(index + 1) * 250000} CFA',
      'invoiceCount': '${(index + 1) * 3}',
    });

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Mes Clients'),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {
              // TODO: Show filter options
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Search Bar
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.white,
            child: TextField(
              controller: _searchController,
              decoration: const InputDecoration(
                hintText: 'Rechercher un client...',
                prefixIcon: Icon(Icons.search),
                contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              ),
              onChanged: (value) {
                // TODO: Implement search
              },
            ),
          ),
          
          // Stats
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: AppColors.primary.withOpacity(0.1),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStatItem('Total', '${clients.length}'),
                Container(height: 30, width: 1, color: AppColors.textLight),
                _buildStatItem('Actifs', '${clients.length - 2}'),
                Container(height: 30, width: 1, color: AppColors.textLight),
                _buildStatItem('Nouveaux', '3'),
              ],
            ),
          ),
          
          // Client List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: clients.length,
              itemBuilder: (context, index) {
                final client = clients[index];
                return _buildClientCard(
                  name: client['name']!,
                  phone: client['phone']!,
                  email: client['email']!,
                  totalSpent: client['totalSpent']!,
                  invoiceCount: client['invoiceCount']!,
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          // TODO: Navigate to add client
        },
        backgroundColor: AppColors.primary,
        icon: const Icon(Icons.person_add),
        label: const Text('Nouveau Client'),
      ),
    );
  }

  Widget _buildStatItem(String label, String value) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: AppColors.primary,
          ),
        ),
        Text(
          label,
          style: const TextStyle(
            fontSize: 12,
            color: AppColors.textSecondary,
          ),
        ),
      ],
    );
  }

  Widget _buildClientCard({
    required String name,
    required String phone,
    required String email,
    required String totalSpent,
    required String invoiceCount,
  }) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: () {
          // TODO: Navigate to client details
        },
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    backgroundColor: AppColors.primary.withOpacity(0.1),
                    child: Text(
                      name[0].toUpperCase(),
                      style: const TextStyle(
                        color: AppColors.primary,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          name,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: AppColors.textPrimary,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            const Icon(Icons.phone, size: 14, color: AppColors.textSecondary),
                            const SizedBox(width: 4),
                            Text(
                              phone,
                              style: const TextStyle(
                                fontSize: 12,
                                color: AppColors.textSecondary,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.more_vert),
                    onPressed: () {
                      _showClientOptions(context);
                    },
                  ),
                ],
              ),
              const SizedBox(height: 12),
              const Divider(),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Total des ventes',
                        style: TextStyle(
                          fontSize: 12,
                          color: AppColors.textSecondary,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        totalSpent,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: AppColors.primary,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppColors.secondary.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.description, size: 14, color: AppColors.secondary),
                        const SizedBox(width: 4),
                        Text(
                          '$invoiceCount factures',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: AppColors.secondary,
                          ),
                        ),
                      ],
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

  void _showClientOptions(BuildContext context) {
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
            ListTile(
              leading: const Icon(Icons.description, color: AppColors.primary),
              title: const Text('Créer une facture'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Navigate to create invoice for this client
              },
            ),
            ListTile(
              leading: const Icon(Icons.edit, color: AppColors.secondary),
              title: const Text('Modifier'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Navigate to edit client
              },
            ),
            ListTile(
              leading: const Icon(Icons.phone, color: AppColors.info),
              title: const Text('Appeler'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Make phone call
              },
            ),
            ListTile(
              leading: const Icon(Icons.email, color: AppColors.accent),
              title: const Text('Envoyer un email'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Send email
              },
            ),
          ],
        ),
      ),
    );
  }
}
