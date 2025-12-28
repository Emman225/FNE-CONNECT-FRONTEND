import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class CreateDocumentScreen extends StatefulWidget {
  const CreateDocumentScreen({super.key, this.documentType = 'invoice'});
  
  final String documentType;

  @override
  State<CreateDocumentScreen> createState() => _CreateDocumentScreenState();
}

class _CreateDocumentScreenState extends State<CreateDocumentScreen> {
  int _currentStep = 0;
  
  // Form controllers
  final _clientController = TextEditingController();
  final _phoneController = TextEditingController();
  
  // Items
  final List<Map<String, dynamic>> _items = [
    {'name': '', 'quantity': 1, 'price': 0.0}
  ];
  
  // Config
  bool _applyTva = false;
  bool _applyAirsi = false;
  
  @override
  void dispose() {
    _clientController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  String get _documentTitle {
    switch (widget.documentType) {
      case 'quote':
        return 'Nouveau Devis';
      case 'proforma':
        return 'Nouvelle Proforma';
      default:
        return 'Nouvelle Facture';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_documentTitle),
      ),
      body: Stepper(
        currentStep: _currentStep,
        onStepContinue: () {
          if (_currentStep < 2) {
            setState(() {
              _currentStep++;
            });
          } else {
            _submitDocument();
          }
        },
        onStepCancel: () {
          if (_currentStep > 0) {
            setState(() {
              _currentStep--;
            });
          } else {
            Navigator.pop(context);
          }
        },
        steps: [
          Step(
            title: const Text('Client'),
            isActive: _currentStep >= 0,
            state: _currentStep > 0 ? StepState.complete : StepState.indexed,
            content: _buildClientStep(),
          ),
          Step(
            title: const Text('Articles'),
            isActive: _currentStep >= 1,
            state: _currentStep > 1 ? StepState.complete : StepState.indexed,
            content: _buildItemsStep(),
          ),
          Step(
            title: const Text('Récapitulatif'),
            isActive: _currentStep >= 2,
            content: _buildSummaryStep(),
          ),
        ],
      ),
    );
  }

  Widget _buildClientStep() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Informations Client',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: 16),
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
      ],
    );
  }

  Widget _buildItemsStep() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Articles & Prestations',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),
            IconButton(
              icon: const Icon(Icons.add_circle, color: AppColors.primary),
              onPressed: _addItem,
            ),
          ],
        ),
        const SizedBox(height: 16),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: _items.length,
          itemBuilder: (context, index) => _buildItemField(index),
        ),
        const SizedBox(height: 24),
        const Text(
          'Configuration',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: 12),
        SwitchListTile(
          title: const Text('Appliquer la TVA (18%)'),
          value: _applyTva,
          onChanged: (value) {
            setState(() {
              _applyTva = value;
            });
          },
          activeColor: AppColors.primary,
        ),
        SwitchListTile(
          title: const Text('Appliquer l\'AIRSI (1%)'),
          value: _applyAirsi,
          onChanged: (value) {
            setState(() {
              _applyAirsi = value;
            });
          },
          activeColor: AppColors.primary,
        ),
      ],
    );
  }

  Widget _buildItemField(int index) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
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
                    icon: const Icon(Icons.delete, color: AppColors.error, size: 20),
                    onPressed: () => _removeItem(index),
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
                _items[index]['name'] = value;
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
                      _items[index]['quantity'] = int.tryParse(value) ?? 1;
                    },
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  flex: 2,
                  child: TextField(
                    decoration: const InputDecoration(
                      labelText: 'Prix unitaire (CFA)',
                      isDense: true,
                    ),
                    keyboardType: TextInputType.number,
                    onChanged: (value) {
                      _items[index]['price'] = double.tryParse(value) ?? 0.0;
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

  Widget _buildSummaryStep() {
    final total = _calculateTotal();
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Récapitulatif',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: 16),
        _buildSummaryRow('Client', _clientController.text),
        _buildSummaryRow('Téléphone', _phoneController.text),
        const Divider(),
        const SizedBox(height: 8),
        const Text(
          'Articles',
          style: TextStyle(fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: 8),
        ..._items.map((item) => _buildItemSummary(item)),
        const Divider(),
        _buildSummaryRow('Total HT', '${total['ht']!.toStringAsFixed(0)} CFA', isBold: true),
        if (_applyTva)
          _buildSummaryRow('TVA (18%)', '${total['tva']!.toStringAsFixed(0)} CFA'),
        if (_applyAirsi)
          _buildSummaryRow('AIRSI (1%)', '${total['airsi']!.toStringAsFixed(0)} CFA'),
        const Divider(),
        _buildSummaryRow(
          'Net à Payer',
          '${total['total']!.toStringAsFixed(0)} CFA',
          isBold: true,
          color: AppColors.primary,
        ),
      ],
    );
  }

  Widget _buildSummaryRow(String label, String value, {bool isBold = false, Color? color}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
              color: color ?? AppColors.textSecondary,
            ),
          ),
          Text(
            value,
            style: TextStyle(
              fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
              color: color ?? AppColors.textPrimary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildItemSummary(Map<String, dynamic> item) {
    final subtotal = (item['quantity'] as int) * (item['price'] as double);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Text(
              '${item['name']} (${item['quantity']}x)',
              style: const TextStyle(fontSize: 12),
            ),
          ),
          Text(
            '${subtotal.toStringAsFixed(0)} CFA',
            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
          ),
        ],
      ),
    );
  }

  void _addItem() {
    setState(() {
      _items.add({'name': '', 'quantity': 1, 'price': 0.0});
    });
  }

  void _removeItem(int index) {
    setState(() {
      _items.removeAt(index);
    });
  }

  Map<String, double> _calculateTotal() {
    double ht = 0;
    for (var item in _items) {
      ht += (item['quantity'] as int) * (item['price'] as double);
    }
    
    final double tva = _applyTva ? ht * 0.18 : 0.0;
    final double airsi = _applyAirsi ? ht * 0.01 : 0.0;
    final double total = ht + tva + airsi;
    
    return {'ht': ht, 'tva': tva, 'airsi': airsi, 'total': total};
  }

  void _submitDocument() {
    // TODO: Implement document creation
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${_documentTitle} créé(e) avec succès !'),
        backgroundColor: AppColors.success,
      ),
    );
    Navigator.pop(context);
  }
}
