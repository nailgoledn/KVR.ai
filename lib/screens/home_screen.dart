import 'package:flutter/material.dart';
import '../services/kvrat_api.dart';

class HomeScreen extends StatefulWidget {
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final controller = TextEditingController();
  final api = KvratApi();

  String result = "";

  void send() async {
    final response = await api.generateBlueprint(controller.text);

    setState(() {
      result = response.toString();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("KVRAT AI")),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: controller,
              decoration: InputDecoration(
                labelText: "اكتب فكرتك",
              ),
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: send,
              child: Text("Generate"),
            ),
            SizedBox(height: 20),
            Expanded(
              child: SingleChildScrollView(
                child: Text(result),
              ),
            )
          ],
        ),
      ),
    );
  }
}