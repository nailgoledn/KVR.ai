import 'dart:convert';
import 'package:flutter/material.dart';
import '../services/kvrat_api.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final controller = TextEditingController();
  final api = KvratApi();

  String result = '';
  bool loading = false;

  Future<void> send() async {
    if (controller.text.trim().isEmpty) return;

    setState(() {
      loading = true;
      result = '';
    });

    try {
      final response = await api.generateBlueprint(controller.text.trim());
      setState(() {
        result = const JsonEncoder.withIndent('  ').convert(response);
      });
    } catch (e) {
      setState(() {
        result = 'Error: $e\n\nتأكد أن Backend يعمل على http://localhost:4000';
      });
    } finally {
      setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('KVRAT AI')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: controller,
              decoration: const InputDecoration(
                labelText: 'اكتب فكرتك',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: loading ? null : send,
              child: Text(loading ? 'جاري التوليد...' : 'Generate'),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: SingleChildScrollView(
                child: Text(result),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
