import UIKit
import React_RCTAppDelegate

@main
class AppDelegate: RCTAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    self.moduleName = "Faith"
    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]
    
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
  
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    // Directly return the bundle URL with Mac's IP address
    // Simulator cannot use localhost, must use actual IP
    let bundleURLString = "http://192.168.0.3:8081/index.bundle?platform=ios&dev=true&minify=false"
    NSLog("🔵 AppDelegate sourceURLForBridge called, URL: %@", bundleURLString)
    return URL(string: bundleURLString)
  }
}
