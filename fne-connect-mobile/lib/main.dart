import 'package:flutter/material.dart';
import 'core/theme/app_theme.dart';
import 'features/public/presentation/pages/public_home_screen.dart';

void main() {
  runApp(const FneConnectApp());
}

class FneConnectApp extends StatelessWidget {
  const FneConnectApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FNE CONNECT',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const PublicHomeScreen(),
    );
  }
}
