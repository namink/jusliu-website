import pymupdf
import sys
import os
import time

def main():
    if len(sys.argv) < 2:
        print("usage: python pdf2img.py <input.pdf> [DPI]")
        sys.exit(1)

    pdf_path = sys.argv[1]
    dpi = int(sys.argv[2]) if len(sys.argv) > 2 else 150

    if not os.path.isfile(pdf_path):
        print(f"error: file not found: {pdf_path}")
        sys.exit(1)

    script_dir = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(script_dir, "output")
    os.makedirs(out_dir, exist_ok=True)

    doc = pymupdf.open(pdf_path)
    total = len(doc)
    print(f"PDF: {os.path.basename(pdf_path)}")
    print(f"pages: {total}")
    print(f"dpi: {dpi}")
    print(f"output: {out_dir}")
    print("---")

    start = time.time()

    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=dpi)
        filename = f"page-{i+1:03d}.png"
        pix.save(os.path.join(out_dir, filename))
        print(f"  [{i+1}/{total}] {filename}  {pix.width}x{pix.height}")

    elapsed = time.time() - start
    print("---")
    print(f"done: {total} pages in {elapsed:.1f}s")
    print(f"output: {out_dir}")

if __name__ == "__main__":
    main()
