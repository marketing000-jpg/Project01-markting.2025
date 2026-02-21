import Foundation
import CoreGraphics
import ImageIO

func cropImageToContent(imagePath: String) {
    let url = URL(fileURLWithPath: imagePath)
    guard let source = CGImageSourceCreateWithURL(url as CFURL, nil),
          let cgImage = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
        print("Could not read image \(imagePath)")
        return
    }
    
    let width = cgImage.width
    let height = cgImage.height
    
    var minX = width
    var minY = height
    var maxX = 0
    var maxY = 0
    
    // Simplistic bounding box
    guard let dataProvider = cgImage.dataProvider,
          let data = dataProvider.data,
          let ptr = CFDataGetBytePtr(data) else {
        return
    }
    
    let bytesPerPixel = cgImage.bitsPerPixel / 8
    let bytesPerRow = cgImage.bytesPerRow
    
    for y in 0..<height {
        for x in 0..<width {
            let offset = y * bytesPerRow + x * bytesPerPixel
            // check alpha channel, usually the 4th byte for RGBA or 1st for ARGB
            // we will just check if any byte is non-zero (if fully transparent is rgb=0,a=0)
            let a = ptr[offset + 3]
            if a > 0 {
                if x < minX { minX = x }
                if x > maxX { maxX = x }
                if y < minY { minY = y }
                if y > maxY { maxY = y }
            }
        }
    }
    
    if minX <= maxX && minY <= maxY {
        let rect = CGRect(x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1)
        if let cropped = cgImage.cropping(to: rect) {
            let dest = CGImageDestinationCreateWithURL(url as CFURL, "public.png" as CFString, 1, nil)!
            CGImageDestinationAddImage(dest, cropped, nil)
            CGImageDestinationFinalize(dest)
            print("Cropped \(imagePath) to \(rect)")
        }
    } else {
        print("Image \(imagePath) is fully transparent")
    }
}
cropImageToContent(imagePath: "/Users/volturia/Desktop/Guidonia Marketing Agency/assets/img/servizi/smm.png")
cropImageToContent(imagePath: "/Users/volturia/Desktop/Guidonia Marketing Agency/assets/img/servizi/seo.png")
cropImageToContent(imagePath: "/Users/volturia/Desktop/Guidonia Marketing Agency/assets/img/servizi/branding.png")
