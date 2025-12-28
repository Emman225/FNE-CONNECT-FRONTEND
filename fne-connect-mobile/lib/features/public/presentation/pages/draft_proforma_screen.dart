import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../subscription/presentation/pages/subscription_screen.dart';

class DraftProformaScreen extends StatefulWidget {
  const DraftProformaScreen({super.key});

  @override
  State<DraftProformaScreen> createState() => _DraftProformaScreenState();
}

class _DraftProformaScreenState extends State<DraftProformaScreen> {
  final _clientController = TextEditingController();
  final _phoneController = TextEditingController();
  final _validityController = TextEditingController(text: '30 jours');
  List<Map<String, dynamic>> _items = [
    {'name': '', 'quantity': 1, 'price': 0.0}
  ];

  @override
  void dispose() {
    _clientController.dispose();
    _phoneController.dispose();
    _validityController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Proforma Brouillon'),
        backgroundColor: AppColors.secondary,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Info Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFFE0F2FE),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFF0EA5E9)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.info_outline, color: Color(0xFF0EA5E9)),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Mode Brouillon',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF075985),
                          ),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Cette proforma est un brouillon. Abonnez-vous pour générer le document officiel.',
                          style: TextStyle(
                            fontSize: 12,
                            color: Color(0xFF075985),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Client Info
            const Text(
              'Informations Client',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1E293B),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _clientController,
              decoration: const InputDecoration(
                labelText: 'Nom du client',
                hintText: 'SARL Global Trade',
                prefixIcon: Icon(Icons.person),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _phoneController,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(
                labelText: 'Téléphone',
                hintText: '+225 07 XX XX XX XX',
                prefixIcon: Icon(Icons.phone),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _validityController,
              decoration: const InputDecoration(
                labelText: 'Validité de l\'offre',
                hintText: '30 jours',
                prefixIcon: Icon(Icons.calendar_today),
              ),
            ),

            const SizedBox(height: 32),

            // Items
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Articles',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF1E293B),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.add_circle, color: AppColors.secondary),
                  onPressed: () {
                    setState(() {
                      _items.add({'name': '', 'quantity': 1, 'price': 0.0});
                    });
                  },
                ),
              ],
            ),
            const SizedBox(height: 12),
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _items.length,
              itemBuilder: (context, index) => _buildItemCard(index),
            ),

            const SizedBox(height: 24),

            // Total
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFFE0F2FE),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Total',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    '${_calculateTotal().toStringAsFixed(0)} CFA',
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: AppColors.secondary,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            // Action Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _showSubscriptionDialog,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFD97706),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.star, color: Colors.white),
                    SizedBox(width: 8),
                    Text(
                      'S\'abonner pour générer',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildItemCard(int index) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Article ${index + 1}',
                  style: const TextStyle(fontWeight: FontWeight.w600),
                ),
                if (_items.length > 1)
                  IconButton(
                    icon: const Icon(Icons.delete, color: Colors.red, size: 20),
                    onPressed: () {
                      setState(() {
                        _items.removeAt(index);
                      });
                    },
                  ),
              ],
            ),
            const SizedBox(height: 8),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Désignation',
                isDense: true,
              ),
              onChanged: (value) {
                setState(() {
                  _items[index]['name'] = value;
                });
              },
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: const InputDecoration(
                      labelText: 'Quantité',
                      isDense: true,
                    ),
                    keyboardType: TextInputType.number,
                    onChanged: (value) {
                      setState(() {
                        _items[index]['quantity'] = int.tryParse(value) ?? 1;
                      });
                    },
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  flex: 2,
                  child: TextField(
                    decoration: const InputDecoration(
                      labelText: 'Prix unitaire',
                      isDense: true,
                    ),
                    keyboardType: TextInputType.number,
                    onChanged: (value) {
                      setState(() {
                        _items[index]['price'] = double.tryParse(value) ?? 0.0;
                      });
                    },
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  double _calculateTotal() {
    double total = 0;
    for (var item in _items) {
      total += (item['quantity'] as int) * (item['price'] as double);
    }
    return total;
  }

  void _showSubscriptionDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Row(
          children: [
            Icon(Icons.lock, color: Color(0xFFD97706)),
            SizedBox(width: 12),
            Expanded(child: Text('Abonnement requis')),
          ],
        ),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Pour générer cette proforma officielle, vous devez être abonné.'),
            SizedBox(height: 12),
            Text(
              'Avantages de l\'abonnement :',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Text('✓ Documents conformes DGI'),
            Text('✓ Conversion facile en facture'),
            Text('✓ Support prioritaire'),
            Text('✓ Et bien plus...'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Annuler'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const SubscriptionScreen(),
                ),
              );
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFD97706),
            ),
            child: const Text('S\'abonner'),
          ),
        ],
      ),
    );
  }
}
