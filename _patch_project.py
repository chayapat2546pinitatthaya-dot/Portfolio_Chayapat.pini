from pathlib import Path

p = Path(__file__).parent / "index.html"
text = p.read_text(encoding="utf-8")

old = (
    '                <div class="project-img placeholder-img">\n'
    '                    <span>...</span>\n'
    '                </div>\n'
    '                <div class="project-info">\n'
    '                    <h3>ผลงานอื่นๆ ในอนาคต</h3>\n'
    '                    <p>กำลังพัฒนาโปรเจกต์ใหม่ๆ เพื่อเสริมสร้างทักษะและความเชี่ยวชาญในด้านต่างๆ ต่อไป</p>\n'
    '                    <div class="project-tech">\n'
    '                        <span>Upcoming</span>\n'
    '                    </div>\n'
    '                    <a href="https://github.com/chayapat2546pinitatthaya-dot" target="_blank"\n'
    '                        class="project-link">เยี่ยมชม GitHub ➔</a>\n'
    '                </div>'
)

new = (
    '                <div class="project-img project-slideshow" data-slideshow>\n'
    '                    <div class="slideshow-track">\n'
    '                        <img src="images/page1.png" alt="Talayjai Bangsaen - หน้า 1" class="slide active">\n'
    '                        <img src="images/page2.png" alt="Talayjai Bangsaen - หน้า 2" class="slide">\n'
    '                        <img src="images/page3.png" alt="Talayjai Bangsaen - หน้า 3" class="slide">\n'
    '                        <img src="images/page4.png" alt="Talayjai Bangsaen - หน้า 4" class="slide">\n'
    '                        <img src="images/page5.png" alt="Talayjai Bangsaen - หน้า 5" class="slide">\n'
    '                        <img src="images/page6.png" alt="Talayjai Bangsaen - หน้า 6" class="slide">\n'
    '                        <img src="images/page7.png" alt="Talayjai Bangsaen - หน้า 7" class="slide">\n'
    '                        <img src="images/page8.png" alt="Talayjai Bangsaen - หน้า 8" class="slide">\n'
    '                        <img src="images/page9.png" alt="Talayjai Bangsaen - หน้า 9" class="slide">\n'
    '                    </div>\n'
    '                    <motion class="slideshow-dots" aria-label="เลือกภาพสไลด์"></div>\n'
    '                </div>\n'
    '                <div class="project-info">\n'
    '                    <h3>เว็บไซต์แนะนำร้านอาหารโซนบางแสน (WordPress)</h3>\n'
    '                    <p>ระบบจัดการเว็บไซต์ WordPress แนะนำร้านอาหารโซนบางแสน รองรับบทบาท Admin และ Editor\n'
    '                        จัดการหลังบ้านด้วย AIOS, Really Simple Security, UpdraftPlus และ WP Activity Log</p>\n'
    '                    <div class="project-tech">\n'
    '                        <span>WordPress</span>\n'
    '                        <span>Admin & Editor</span>\n'
    '                        <span>CMS Management</span>\n'
    '                    </div>\n'
    '                    <a href="https://talayjaibangsaen.byteboy.pro/?classId=80c93bae-d5bb-47e4-a4bf-c17c9e933ad6&assignmentId=1a26b9d6-da4e-4fc6-90af-c3d2bbe170c6&submissionId=0b978a53-4d28-dbb9-45f9-aca7f7d552fb&classId=80c93bae-d5bb-47e4-a4bf-c17c9e933ad6&assignmentId=3a93a3db-6685-4e52-a28f-12bb779fa655&submissionId=ece9262c-9833-291d-7962-091a98a97c6d"\n'
    '                        target="_blank" rel="noopener noreferrer" class="project-link">เยี่ยมชมเว็บไซต์ ➔</a>\n'
    '                </div>'
)

if old not in text:
    raise SystemExit("OLD block not found")

p.write_text(text.replace(old, new, 1), encoding="utf-8")
print("OK")
