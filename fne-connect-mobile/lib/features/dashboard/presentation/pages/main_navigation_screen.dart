import 'package:flutter/material.dart';
import 'home_screen.dart';
import '../../../documents/presentation/pages/document_list_screen.dart';
import '../../../clients/presentation/pages/client_list_screen.dart';
import '../../../finance/presentation/pages/finance_screen.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../documents/presentation/pages/create_document_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    HomeScreen(),
    DocumentListScreen(),
    ClientListScreen(),
    FinanceScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      floatingActionButton: _buildFab(),
      floatingActionButtonLocation: _currentIndex == 1 
          ? const TabItemFabLocation(index: 1, totalCount: 4)
          : (_currentIndex == 2 ? const TabItemFabLocation(index: 2, totalCount: 4) : null),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 20,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(
                  icon: Icons.dashboard_rounded,
                  label: 'Accueil',
                  index: 0,
                ),
                _buildNavItem(
                  icon: Icons.description_rounded,
                  label: 'Documents',
                  index: 1,
                ),
                _buildNavItem(
                  icon: Icons.people_rounded,
                  label: 'Clients',
                  index: 2,
                ),
                _buildNavItem(
                  icon: Icons.account_balance_wallet_rounded,
                  label: 'Finance',
                  index: 3,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget? _buildFab() {
    if (_currentIndex == 1) {
      return FloatingActionButton.extended(
        onPressed: () => _showCreateDocumentDialog(context),
        backgroundColor: AppColors.primary,
        icon: const Icon(Icons.add),
        label: const Text('Créer'),
      );
    } else if (_currentIndex == 2) {
      return FloatingActionButton.extended(
        onPressed: () {
          // TODO: Navigate to add client
        },
        backgroundColor: AppColors.primary,
        icon: const Icon(Icons.person_add),
        label: const Text('Nouveau Client'),
      );
    }
    return null;
  }

  void _showCreateDocumentDialog(BuildContext context) {
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
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const CreateDocumentScreen(documentType: 'invoice')),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.assignment, color: AppColors.secondary),
              title: const Text('Devis'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const CreateDocumentScreen(documentType: 'quote')),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.receipt_long, color: AppColors.accent),
              title: const Text('Proforma'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const CreateDocumentScreen(documentType: 'proforma')),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNavItem({
    required IconData icon,
    required String label,
    required int index,
  }) {
    final isSelected = _currentIndex == index;
    return GestureDetector(
      onTap: () {
        setState(() {
          _currentIndex = index;
        });
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: EdgeInsets.symmetric(
          horizontal: isSelected ? 16 : 12,
          vertical: 8,
        ),
        decoration: BoxDecoration(
          gradient: isSelected
              ? const LinearGradient(
                  colors: [Color(0xFF10B981), Color(0xFF059669)],
                )
              : null,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              color: isSelected ? Colors.white : const Color(0xFF94A3B8),
              size: 24,
            ),
            if (isSelected) ...[
              const SizedBox(width: 8),
              Text(
                label,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                  fontSize: 13,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class TabItemFabLocation extends FloatingActionButtonLocation {
  final int index;
  final int totalCount;

  const TabItemFabLocation({
    required this.index,
    required this.totalCount,
  });

  @override
  Offset getOffset(ScaffoldPrelayoutGeometry scaffoldGeometry) {
    final double width = scaffoldGeometry.scaffoldSize.width;
    final double itemWidth = width / totalCount;
    final double fabWidth = scaffoldGeometry.floatingActionButtonSize.width;
    final double fabHeight = scaffoldGeometry.floatingActionButtonSize.height;

    // Calculate center of the tab
    // We use a slight offset to account for the gaps in spaceAround
    final double centerX = itemWidth * index + (itemWidth / 2);
    
    final double bottomNavigationBarHeight = scaffoldGeometry.bottomNavigationBarSize.height;
    
    // Y position: above bottom navigation bar
    double fabY = scaffoldGeometry.scaffoldSize.height - fabHeight - 20;
    if (bottomNavigationBarHeight > 0) {
      fabY -= bottomNavigationBarHeight;
    }

    return Offset(centerX - (fabWidth / 2), fabY);
  }
}
