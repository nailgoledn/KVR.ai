import 'package:flutter/material.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int selectedIndex = 0;

  final List<String> titles = [
    "Dashboard",
    "AI Assistant",
    "API Keys",
    "Leads",
    "Settings",
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F6FA),
      body: Row(
        children: [
          // SIDEBAR
          Container(
            width: 250,
            color: const Color(0xFF0D1B2A),
            child: Column(
              children: [
                const SizedBox(height: 40),
                const Text(
                  "KVRAT AI OS",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 30),

                _SideItem(
                  icon: Icons.dashboard,
                  title: "Dashboard",
                  selected: selectedIndex == 0,
                  onTap: () => setState(() => selectedIndex = 0),
                ),
                _SideItem(
                  icon: Icons.smart_toy,
                  title: "AI",
                  selected: selectedIndex == 1,
                  onTap: () => setState(() => selectedIndex = 1),
                ),
                _SideItem(
                  icon: Icons.key,
                  title: "API Keys",
                  selected: selectedIndex == 2,
                  onTap: () => setState(() => selectedIndex = 2),
                ),
                _SideItem(
                  icon: Icons.people,
                  title: "Leads",
                  selected: selectedIndex == 3,
                  onTap: () => setState(() => selectedIndex = 3),
                ),
                _SideItem(
                  icon: Icons.settings,
                  title: "Settings",
                  selected: selectedIndex == 4,
                  onTap: () => setState(() => selectedIndex = 4),
                ),
              ],
            ),
          ),

          // MAIN AREA
          Expanded(
            child: Column(
              children: [
                // TOP BAR
                Container(
                  height: 70,
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black12,
                        blurRadius: 6,
                      )
                    ],
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        titles[selectedIndex],
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Icon(Icons.notifications),
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                Expanded(
                  child: _buildPage(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPage() {
    switch (selectedIndex) {
      case 0:
        return _dashboard();
      case 1:
        return _ai();
      case 2:
        return _apiKeys();
      case 3:
        return _leads();
      case 4:
        return _settings();
      default:
        return const SizedBox();
    }
  }

  // ================= DASHBOARD =================
  Widget _dashboard() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              _statCard("Users", "1,240", Icons.people),
              const SizedBox(width: 15),
              _statCard("AI Requests", "8,532", Icons.smart_toy),
              const SizedBox(width: 15),
              _statCard("Revenue", "\$12.4K", Icons.attach_money),
            ],
          ),
          const SizedBox(height: 20),

          Expanded(
            child: Row(
              children: [
                Expanded(child: _card("Recent Activity")),
                const SizedBox(width: 15),
                Expanded(child: _card("AI Insights")),
              ],
            ),
          )
        ],
      ),
    );
  }

  // ================= CARDS =================
  Widget _statCard(String title, String value, IconData icon) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: const [
            BoxShadow(color: Colors.black12, blurRadius: 6),
          ],
        ),
        child: Row(
          children: [
            Icon(icon, color: Colors.blue),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(color: Colors.grey)),
                Text(
                  value,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  Widget _card(String title) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: const [
          BoxShadow(color: Colors.black12, blurRadius: 6),
        ],
      ),
      child: Center(
        child: Text(
          title,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  // ================= PAGES =================
  Widget _ai() {
    return const Center(child: Text("AI Assistant Panel"));
  }

  Widget _apiKeys() {
    return const Center(child: Text("API Keys Manager"));
  }

  Widget _leads() {
    return const Center(child: Text("Leads Management"));
  }

  Widget _settings() {
    return const Center(child: Text("Settings Page"));
  }
}

// ================= SIDEBAR ITEM =================
class _SideItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final bool selected;
  final VoidCallback onTap;

  const _SideItem({
    required this.icon,
    required this.title,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 15),
        color: selected ? Colors.white10 : Colors.transparent,
        child: Row(
          children: [
            Icon(
              icon,
              color: selected ? Colors.white : Colors.white70,
            ),
            const SizedBox(width: 10),
            Text(
              title,
              style: TextStyle(
                color: selected ? Colors.white : Colors.white70,
              ),
            ),
          ],
        ),
      ),
    );
  }
}