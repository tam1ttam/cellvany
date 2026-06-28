import json, sys, os
sys.stdout.reconfigure(encoding='utf-8')

BASE = 'c:/Users/Tam/Downloads/Web (1)/Web (1)'
DATA_PATH = BASE + '/asset/data/data.json'
print('DATA_PATH =', DATA_PATH)
print('exists =', os.path.exists(DATA_PATH))

IMG_MAP = {
    1:  'dau_goi_phuc_hoi_thao_moc_thuan_chay.jpeg',
    2:  'dau_xa_suon_muot_sinh_hoc.jpeg',
    3:  'tinh_chat_tay_te_bao_chet_da_dau_tu_muoi_bien_bac_ha.jpeg',
    4:  'sua_rua_mat_tao_bot_diu_nhe.jpeg',
    5:  'serum_cap_am_duong_sang_mo_tham.jpeg',
    6:  'kem_duong_khoa_am_diu_da.jpeg',
    7:  'sua_tam_diu_nhe_cap_am.jpeg',
    8:  'dau_tay_trang_hoa_tra.jpeg',
    9:  'xit_duong_chat_toner_mist_khoa_am_tinh_chat_hoa_hong_lo_hoi.jpeg',
    10: 'kem_duong_lam_diu_va_bao_ve_dau_ti.jpeg',
    11: 'kem_duong_the_lanh_tinh_cho_me_be.jpeg',
    12: 'dau_thoa_ngan_ngua_va_lam_mo_vet_ran_huu_co.jpeg',
    13: 'sua_tam_diu_nhe_cap_am.jpeg',
    14: 'kem_duong_lam_diu_va_bao_ve_dau_ti.jpeg',
}

with open(DATA_PATH, encoding='utf-8') as f:
    data = json.load(f)

updated = 0
for p in data['products']:
    pid = p.get('id')
    if pid in IMG_MAP:
        p['image'] = 'asset/img/' + IMG_MAP[pid]
        updated += 1

with open(DATA_PATH, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')

print(f'Done: {updated} products updated')

with open(DATA_PATH, encoding='utf-8') as f:
    check = json.load(f)
missing = [p['id'] for p in check['products'] if 'image' not in p]
print(f'Missing images: {missing if missing else "none"}')
