"""
Generate transparent high-res PNG badges for Varun Basnett's Portfolio:
- valheim_rune_badge.png
- hk_knight_badge.png
- silksong_hornet_badge.png
- vermintide2_skaven_badge.png
- varun_avatar.png
- steam_badge.png
"""
import math
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

os.makedirs('assets/badges', exist_ok=True)

def create_valheim_badge():
    size = (400, 400)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = 200, 200

    # Glow layer
    glow = Image.new('RGBA', size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((70, 70, 330, 330), fill=(245, 158, 11, 45))
    gd.ellipse((100, 100, 300, 300), fill=(217, 119, 6, 80))
    glow = glow.filter(ImageFilter.GaussianBlur(15))
    img.alpha_composite(glow)

    # Outer Norse Shield Ring
    draw = ImageDraw.Draw(img)
    draw.ellipse((80, 80, 320, 320), fill=(28, 25, 23, 240), outline=(180, 120, 50, 255), width=8)
    draw.ellipse((95, 95, 305, 305), outline=(120, 80, 35, 200), width=3)

    # Rune Studs around rim
    for i in range(12):
        angle = i * (2 * math.pi / 12)
        rx = cx + 110 * math.cos(angle)
        ry = cy + 110 * math.sin(angle)
        draw.ellipse((rx-6, ry-6, rx+6, ry+6), fill=(217, 119, 6, 255), outline=(254, 243, 199, 255), width=2)

    # Crossed Battle Axes behind rune
    # Axe 1 (diagonal)
    draw.line((120, 120, 280, 280), fill=(140, 110, 80, 255), width=10)
    # Axe heads
    draw.polygon([(110, 110), (140, 95), (150, 135), (125, 140)], fill=(160, 160, 170, 255), outline=(220, 220, 230, 255))
    # Axe 2 (diagonal)
    draw.line((280, 120, 120, 280), fill=(140, 110, 80, 255), width=10)
    draw.polygon([(290, 110), (260, 95), (250, 135), (275, 140)], fill=(160, 160, 170, 255), outline=(220, 220, 230, 255))

    # Center Runestone
    draw.polygon([(150, 140), (250, 140), (270, 200), (250, 260), (150, 260), (130, 200)],
                 fill=(40, 35, 30, 255), outline=(245, 158, 11, 230), width=4)

    # Glowing Elder Futhark Othala / Algiz Rune
    # Algiz elk rune: central vertical stem with two diagonal branches
    draw.line((200, 150, 200, 250), fill=(254, 215, 170, 255), width=8)
    draw.line((200, 195, 165, 160), fill=(254, 215, 170, 255), width=7)
    draw.line((200, 195, 235, 160), fill=(254, 215, 170, 255), width=7)
    # Mystic runes dots
    draw.ellipse((195, 140, 205, 150), fill=(255, 255, 255, 255))

    # Norse Valknut accents
    draw.polygon([(185, 225), (215, 225), (200, 245)], outline=(245, 158, 11, 200), width=3)

    img.save('assets/badges/valheim_rune_badge.png', 'PNG')
    print('Generated assets/badges/valheim_rune_badge.png')

def create_hk_badge():
    size = (400, 400)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    cx, cy = 200, 200

    # Melancholic Deep Soul Glow
    glow = Image.new('RGBA', size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((70, 70, 330, 330), fill=(56, 189, 248, 60))
    gd.ellipse((110, 110, 290, 290), fill=(99, 102, 241, 70))
    glow = glow.filter(ImageFilter.GaussianBlur(18))
    img.alpha_composite(glow)

    draw = ImageDraw.Draw(img)
    # Soul Vessel Outer Ring
    draw.ellipse((85, 85, 315, 315), fill=(15, 23, 42, 235), outline=(147, 197, 253, 220), width=6)
    draw.ellipse((100, 100, 300, 300), outline=(59, 130, 246, 140), width=2)

    # Knight Cloak (Dark Charcoal Wings)
    draw.polygon([(140, 230), (200, 290), (260, 230), (240, 310), (200, 325), (160, 310)], fill=(30, 41, 59, 255), outline=(71, 85, 105, 255), width=3)

    # The Pure Nail (Diagonal behind head)
    # Blade
    draw.polygon([(110, 290), (120, 280), (290, 110), (280, 100)], fill=(226, 232, 240, 255), outline=(148, 163, 184, 255), width=2)
    # Hilt
    draw.line((100, 300, 125, 275), fill=(203, 213, 225, 255), width=6)
    draw.line((90, 310, 105, 295), fill=(100, 116, 139, 255), width=8)

    # The Knight Mask (Bone White Shell)
    # Horns
    # Left Horn
    draw.polygon([(155, 180), (130, 120), (145, 110), (175, 165)], fill=(248, 250, 252, 255), outline=(203, 213, 225, 255), width=2)
    # Right Horn
    draw.polygon([(245, 180), (270, 120), (255, 110), (225, 165)], fill=(248, 250, 252, 255), outline=(203, 213, 225, 255), width=2)
    # Head Oval
    draw.ellipse((150, 150, 250, 250), fill=(248, 250, 252, 255), outline=(203, 213, 225, 255), width=3)

    # Void Black Eye Hollows
    # Left eye
    draw.ellipse((168, 185, 192, 225), fill=(10, 15, 30, 255))
    # Right eye
    draw.ellipse((208, 185, 232, 225), fill=(10, 15, 30, 255))

    # Soul Particle Accents
    for pt in [(130, 160), (270, 160), (200, 95), (140, 260), (260, 260)]:
        draw.ellipse((pt[0]-4, pt[1]-4, pt[0]+4, pt[1]+4), fill=(186, 230, 253, 240), outline=(255, 255, 255, 255), width=1)

    img.save('assets/badges/hk_knight_badge.png', 'PNG')
    print('Generated assets/badges/hk_knight_badge.png')

def create_silksong_badge():
    size = (400, 400)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    cx, cy = 200, 200

    # Crimson / Amber Silk Glow
    glow = Image.new('RGBA', size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((70, 70, 330, 330), fill=(225, 29, 72, 60))
    gd.ellipse((100, 100, 300, 300), fill=(245, 158, 11, 60))
    glow = glow.filter(ImageFilter.GaussianBlur(16))
    img.alpha_composite(glow)

    draw = ImageDraw.Draw(img)
    # Pharloom Citadel Ring
    draw.ellipse((85, 85, 315, 315), fill=(24, 15, 20, 235), outline=(244, 63, 94, 220), width=6)
    draw.ellipse((98, 98, 302, 302), outline=(251, 191, 36, 140), width=2)

    # Silk Thread Loops (Swirling crimson & gold threads)
    for r in [90, 75]:
        draw.arc((cx-r, cy-r-10, cx+r, cy+r-10), start=30, end=210, fill=(244, 63, 94, 180), width=4)
        draw.arc((cx-r+10, cy-r+10, cx+r-10, cy+r+10), start=160, end=340, fill=(251, 191, 36, 180), width=3)

    # Hornet's Needle (Long tapering needle spear across)
    # Needle blade
    draw.polygon([(110, 290), (290, 110), (280, 100), (100, 280)], fill=(241, 245, 249, 255), outline=(225, 29, 72, 255), width=2)
    # Needle Eyelet (with red thread running through!)
    draw.ellipse((270, 105, 285, 120), fill=(24, 15, 20, 255), outline=(244, 63, 94, 255), width=2)
    draw.line((280, 110, 320, 80), fill=(244, 63, 94, 255), width=4)

    # Hornet's Flowing Crimson Cloak
    draw.polygon([(140, 220), (200, 320), (260, 220), (230, 250), (200, 240), (170, 250)],
                 fill=(190, 18, 60, 255), outline=(244, 63, 94, 255), width=3)

    # Hornet Mask (Tall sleek curved horns)
    # Left curved horn
    draw.polygon([(160, 180), (135, 100), (155, 95), (180, 160)], fill=(255, 255, 255, 255), outline=(244, 63, 94, 200), width=2)
    # Right curved horn
    draw.polygon([(240, 180), (265, 100), (245, 95), (220, 160)], fill=(255, 255, 255, 255), outline=(244, 63, 94, 200), width=2)
    # Mask Oval
    draw.ellipse((155, 145, 245, 245), fill=(255, 255, 255, 255), outline=(244, 63, 94, 200), width=3)

    # Hornet Eyes (Angled, focused insect eyes)
    draw.polygon([(170, 185), (190, 195), (175, 215)], fill=(15, 10, 15, 255))
    draw.polygon([(230, 185), (210, 195), (225, 215)], fill=(15, 10, 15, 255))

    # Spool & Bell Motifs
    draw.ellipse((190, 245, 210, 265), fill=(251, 191, 36, 255), outline=(217, 119, 6, 255), width=2)

    img.save('assets/badges/silksong_hornet_badge.png', 'PNG')
    print('Generated assets/badges/silksong_hornet_badge.png')

def create_vermintide_badge():
    size = (400, 400)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    cx, cy = 200, 200

    # Warpstone Toxic Neon Green Glow
    glow = Image.new('RGBA', size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((70, 70, 330, 330), fill=(16, 185, 129, 65))
    gd.ellipse((100, 100, 300, 300), fill=(34, 197, 94, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(18))
    img.alpha_composite(glow)

    draw = ImageDraw.Draw(img)
    # Iron/Rust Grimdark Hex Ring
    pts = []
    for i in range(6):
        a = i * (math.pi / 3) - math.pi/6
        pts.append((cx + 115 * math.cos(a), cy + 115 * math.sin(a)))
    draw.polygon(pts, fill=(20, 24, 20, 245), outline=(16, 185, 129, 230), width=6)

    # Skaven Inverted Triangle / Clan Sigil
    tri_pts = [(cx, cy - 65), (cx + 65, cy + 50), (cx - 65, cy + 50)]
    draw.polygon(tri_pts, fill=(10, 15, 10, 200), outline=(34, 197, 94, 255), width=5)

    # Warpstone Crystal (Irregular glowing green gemstone)
    c_pts = [(200, 155), (225, 180), (215, 220), (185, 220), (175, 180)]
    draw.polygon(c_pts, fill=(34, 197, 94, 255), outline=(187, 247, 208, 255), width=3)

    # Twin-tailed Comet / Warhammer Hammer Head
    # Hammer handle
    draw.line((130, 270, 270, 130), fill=(120, 113, 108, 255), width=8)
    # Hammer Head
    draw.polygon([(260, 110), (285, 135), (265, 155), (240, 130)], fill=(75, 85, 99, 255), outline=(16, 185, 129, 255), width=2)

    # Rat Claws / Spikes
    draw.line([(180, 240), (170, 260)], fill=(34, 197, 94, 240), width=4)
    draw.line([(200, 245), (200, 270)], fill=(34, 197, 94, 240), width=4)
    draw.line([(220, 240), (230, 260)], fill=(34, 197, 94, 240), width=4)

    # Toxic Sparkles
    for pt in [(150, 140), (250, 140), (140, 220), (260, 220), (200, 120)]:
        draw.ellipse((pt[0]-4, pt[1]-4, pt[0]+4, pt[1]+4), fill=(74, 222, 128, 255))

    img.save('assets/badges/vermintide2_skaven_badge.png', 'PNG')
    print('Generated assets/badges/vermintide2_skaven_badge.png')

def create_varun_avatar():
    size = (400, 400)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    cx, cy = 200, 200

    # Tech Indigo/Cyan glow
    glow = Image.new('RGBA', size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((50, 50, 350, 350), fill=(99, 102, 241, 60))
    gd.ellipse((80, 80, 320, 320), fill=(6, 182, 212, 70))
    glow = glow.filter(ImageFilter.GaussianBlur(20))
    img.alpha_composite(glow)

    draw = ImageDraw.Draw(img)
    # Cybernetic Base Ring
    draw.ellipse((70, 70, 330, 330), fill=(15, 23, 42, 240), outline=(99, 102, 241, 230), width=6)
    draw.ellipse((85, 85, 315, 315), outline=(6, 182, 212, 160), width=2)

    # Circuit Board Nodes & Traces
    for deg in range(0, 360, 45):
        rad = math.radians(deg)
        x1 = cx + 115 * math.cos(rad)
        y1 = cy + 115 * math.sin(rad)
        x2 = cx + 130 * math.cos(rad)
        y2 = cy + 130 * math.sin(rad)
        draw.line((x1, y1, x2, y2), fill=(6, 182, 212, 200), width=3)
        draw.ellipse((x2-4, y2-4, x2+4, y2+4), fill=(165, 243, 252, 255))

    # Sleek Developer Avatar Figure
    # Shoulders / Tech Hoodie
    draw.polygon([(110, 320), (145, 260), (255, 260), (290, 320)], fill=(30, 41, 59, 255), outline=(51, 65, 85, 255), width=3)
    # Hoodie Collar / Neon Line
    draw.line((175, 260, 200, 290), fill=(6, 182, 212, 255), width=3)
    draw.line((225, 260, 200, 290), fill=(6, 182, 212, 255), width=3)

    # Neck
    draw.rectangle((185, 230, 215, 265), fill=(226, 186, 150, 255))

    # Head
    draw.ellipse((155, 140, 245, 240), fill=(240, 200, 165, 255))

    # Hair (Modern Styled Dark Hair)
    draw.polygon([(145, 160), (160, 125), (200, 115), (240, 125), (255, 160), (250, 145), (200, 130), (150, 145)],
                 fill=(15, 23, 42, 255))

    # Gaming Headset (RGB lit!)
    # Band
    draw.arc((140, 115, 260, 235), start=180, end=360, fill=(71, 85, 105, 255), width=10)
    # Earcups
    draw.ellipse((135, 165, 160, 215), fill=(15, 23, 42, 255), outline=(6, 182, 212, 255), width=4)
    draw.ellipse((240, 165, 265, 215), fill=(15, 23, 42, 255), outline=(6, 182, 212, 255), width=4)
    # Headset mic
    draw.line((145, 205, 175, 225), fill=(100, 116, 139, 255), width=3)
    draw.ellipse((172, 222, 178, 228), fill=(244, 63, 94, 255))

    # Glasses (Tech Specs)
    draw.rectangle((165, 175, 195, 195), outline=(99, 102, 241, 255), width=3)
    draw.rectangle((205, 175, 235, 195), outline=(99, 102, 241, 255), width=3)
    draw.line((195, 183, 205, 183), fill=(99, 102, 241, 255), width=2)
    # Eyes
    draw.ellipse((177, 182, 183, 188), fill=(15, 23, 42, 255))
    draw.ellipse((217, 182, 223, 188), fill=(15, 23, 42, 255))
    # Smile
    draw.arc((185, 205, 215, 220), start=0, end=180, fill=(71, 85, 105, 255), width=3)

    img.save('assets/badges/varun_avatar.png', 'PNG')
    print('Generated assets/badges/varun_avatar.png')

def create_steam_badge():
    size = (400, 400)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = 200, 200

    # Steam Navy/Silver glow
    glow = Image.new('RGBA', size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((60, 60, 340, 340), fill=(2, 132, 199, 70))
    glow = glow.filter(ImageFilter.GaussianBlur(18))
    img.alpha_composite(glow)

    draw = ImageDraw.Draw(img)
    # Outer Steam Circle
    draw.ellipse((75, 75, 325, 325), fill=(23, 26, 33, 245), outline=(102, 192, 244, 230), width=7)

    # Steam mechanical crank & piston icon
    # Main pivot circle
    draw.ellipse((120, 200, 180, 260), fill=(102, 192, 244, 255))
    draw.ellipse((135, 215, 165, 245), fill=(23, 26, 33, 255))

    # Connecting rod
    draw.polygon([(150, 220), (250, 140), (265, 155), (165, 235)], fill=(102, 192, 244, 255))

    # Small pivot
    draw.ellipse((235, 125, 275, 165), fill=(102, 192, 244, 255))
    draw.ellipse((245, 135, 265, 155), fill=(23, 26, 33, 255))

    # Center valve / wheel
    draw.ellipse((175, 175, 225, 225), outline=(199, 213, 224, 200), width=3)

    img.save('assets/badges/steam_badge.png', 'PNG')
    print('Generated assets/badges/steam_badge.png')

if __name__ == '__main__':
    create_valheim_badge()
    create_hk_badge()
    create_silksong_badge()
    create_vermintide_badge()
    create_varun_avatar()
    create_steam_badge()
