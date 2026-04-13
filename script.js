// Show/hide routing protocol fields based on selection
const routingProtocol = document.getElementById('routingProtocol');
const protoSections = ['static', 'ospf', 'eigrp', 'bgp'];

routingProtocol.addEventListener('change', () => {
  protoSections.forEach(p => {
    document.getElementById(p + 'Fields').classList.add('hidden');
  });
  const val = routingProtocol.value;
  if (val && val !== 'rip') {
    document.getElementById(val + 'Fields').classList.remove('hidden');
  }
});

document.getElementById('generateBtn').addEventListener('click', generateConfig);
document.getElementById('clearBtn').addEventListener('click', clearForm);
document.getElementById('copyBtn').addEventListener('click', copyConfig);

function val(id) {
  return document.getElementById(id).value.trim();
}

function generateConfig() {
  const lines = [];

  // --- Device Settings ---
  const hostname = val('hostname');
  const domain = val('domain');
  const enableSecret = val('enableSecret');
  const banner = val('bannerMotd');

  if (hostname) lines.push(`hostname ${hostname}`);
  if (domain)   lines.push(`ip domain-name ${domain}`);
  if (enableSecret) lines.push(`enable secret ${enableSecret}`);

  lines.push('!');
  lines.push('no ip http server');
  lines.push('no ip http secure-server');

  // --- Banner ---
  if (banner) {
    lines.push('!');
    lines.push('banner motd ^');
    lines.push(banner);
    lines.push('^');
  }

  // --- SSH ---
  const sshVer = val('sshVersion');
  if (sshVer) {
    lines.push('!');
    if (hostname && domain) {
      lines.push('crypto key generate rsa modulus 2048');
    }
    lines.push(`ip ssh version ${sshVer}`);
    lines.push('ip ssh authentication-retries 3');
    lines.push('ip ssh time-out 60');
    lines.push('!');
    lines.push('line vty 0 15');
    lines.push(' transport input ssh');
    lines.push(' login local');
  }

  // --- Interface ---
  const intType = val('intType');
  const intNum  = val('intNumber');
  if (intType && intNum !== '') {
    lines.push('!');
    lines.push(`interface ${intType}${intNum}`);
    const desc = val('intDesc');
    if (desc) lines.push(` description ${desc}`);

    const mode = val('intMode');
    const vlan = val('vlanId');
    const ip   = val('ipAddress');
    const mask = val('subnetMask');

    if (mode === 'routed') {
      lines.push(' no switchport');
      if (ip && mask) lines.push(` ip address ${ip} ${mask}`);
    } else if (mode === 'access') {
      lines.push(' switchport mode access');
      if (vlan) lines.push(` switchport access vlan ${vlan}`);
    } else if (mode === 'trunk') {
      lines.push(' switchport mode trunk');
      if (vlan) lines.push(` switchport trunk allowed vlan ${vlan}`);
    } else {
      // No mode selected — just add IP if provided
      if (ip && mask) lines.push(` ip address ${ip} ${mask}`);
    }

    lines.push(' no shutdown');
  }

  // --- Routing ---
  const proto = val('routingProtocol');
  if (proto) {
    lines.push('!');
    if (proto === 'static') {
      const dest = val('staticDest');
      const smask = val('staticMask');
      const next = val('staticNext');
      if (dest && smask && next) {
        lines.push(`ip route ${dest} ${smask} ${next}`);
      }
    } else if (proto === 'ospf') {
      const pid  = val('ospfPid') || '1';
      const rid  = val('ospfRouterId');
      const net  = val('ospfNetwork');
      const area = val('ospfArea') || '0';
      lines.push(`router ospf ${pid}`);
      if (rid) lines.push(` router-id ${rid}`);
      if (net) lines.push(` network ${net} area ${area}`);
    } else if (proto === 'eigrp') {
      const as  = val('eigrpAs') || '100';
      const net = val('eigrpNetwork');
      lines.push(`router eigrp ${as}`);
      if (net) lines.push(` network ${net}`);
      lines.push(' no auto-summary');
    } else if (proto === 'bgp') {
      const as    = val('bgpAs');
      const nbr   = val('bgpNeighbor');
      const nbrAs = val('bgpNeighborAs');
      if (as) {
        lines.push(`router bgp ${as}`);
        if (nbr && nbrAs) {
          lines.push(` neighbor ${nbr} remote-as ${nbrAs}`);
        }
      }
    } else if (proto === 'rip') {
      lines.push('router rip');
      lines.push(' version 2');
      lines.push(' no auto-summary');
    }
  }

  // --- Syslog ---
  const syslog = val('syslogServer');
  if (syslog) {
    lines.push('!');
    lines.push(`logging host ${syslog}`);
    lines.push('logging trap informational');
  }

  // --- NTP ---
  const ntp = val('ntpServer');
  if (ntp) {
    lines.push('!');
    lines.push(`ntp server ${ntp}`);
  }

  // --- SNMP ---
  const snmp = val('snmpCommunity');
  if (snmp) {
    lines.push('!');
    lines.push(`snmp-server community ${snmp} RO`);
  }

  lines.push('!');
  lines.push('end');

  if (lines.length <= 2) {
    alert('Please fill in at least one field before generating.');
    return;
  }

  document.getElementById('configOutput').textContent = lines.join('\n');
  const outputSection = document.getElementById('outputSection');
  outputSection.style.display = 'block';
  outputSection.scrollIntoView({ behavior: 'smooth' });
}

function clearForm() {
  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.value = '';
  });
  protoSections.forEach(p => {
    document.getElementById(p + 'Fields').classList.add('hidden');
  });
  document.getElementById('outputSection').style.display = 'none';
  document.getElementById('configOutput').textContent = '';
}

function copyConfig() {
  const text = document.getElementById('configOutput').textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy to Clipboard';
      btn.classList.remove('copied');
    }, 2000);
  });
}
